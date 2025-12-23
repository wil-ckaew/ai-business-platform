-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_role enum
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'analyst', 'user');
CREATE TYPE sale_status AS ENUM ('pending', 'completed', 'failed', 'refunded', 'cancelled');
CREATE TYPE prediction_type AS ENUM ('revenue', 'sales', 'customer', 'market');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    role user_role DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    segment VARCHAR(50),
    lifetime_value DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    sku VARCHAR(100) UNIQUE,
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sales table
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status sale_status DEFAULT 'pending',
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Predictions table
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_type prediction_type NOT NULL,
    historical_data JSONB,
    predicted_values JSONB,
    confidence_score DECIMAL(5, 2),
    timeframe_start DATE,
    timeframe_end DATE,
    is_accurate BOOLEAN,
    actual_outcome JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insights table
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    impact_level VARCHAR(50),
    confidence_score DECIMAL(5, 2),
    source_data JSONB,
    is_actionable BOOLEAN DEFAULT true,
    action_taken BOOLEAN DEFAULT false,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics cache table
CREATE TABLE analytics_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    data JSONB NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_sales_customer_id ON sales(customer_id);
CREATE INDEX idx_sales_product_id ON sales(product_id);
CREATE INDEX idx_sales_created_at ON sales(created_at);
CREATE INDEX idx_predictions_timeframe ON predictions(timeframe_start, timeframe_end);
CREATE INDEX idx_insights_generated_at ON insights(generated_at);
CREATE INDEX idx_analytics_cache_key ON analytics_cache(cache_key);
CREATE INDEX idx_analytics_expires ON analytics_cache(expires_at);

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, username, password_hash, full_name, role, is_active) 
VALUES (
    'admin@aibusiness.com',
    'admin',
    '$2b$12$YOUR_HASHED_PASSWORD_HERE', -- Use bcrypt to generate: hash('admin123', 12)
    'Administrator',
    'admin',
    true
);

-- Insert sample customers
INSERT INTO customers (name, email, phone, company, lifetime_value) VALUES
('TechCorp Inc.', 'contact@techcorp.com', '+1-555-123-4567', 'TechCorp', 125000.00),
('Startup XYZ', 'info@startupxyz.com', '+1-555-234-5678', 'Startup XYZ', 89000.00),
('Global Solutions', 'sales@globalsolutions.com', '+44-20-1234-5678', 'Global Solutions', 210000.00);

-- Insert sample products
INSERT INTO products (name, description, category, price, cost, sku) VALUES
('Enterprise Plan', 'Complete business solution with AI', 'Software', 4999.99, 1500.00, 'ENT-001'),
('Business Suite', 'Professional tools for SMEs', 'Software', 899.99, 300.00, 'BUS-002'),
('Basic Plan', 'Entry-level subscription', 'Software', 99.99, 30.00, 'BAS-003');

-- Insert sample sales
INSERT INTO sales (customer_id, product_id, amount, quantity, status, payment_method) VALUES
((SELECT id FROM customers WHERE email = 'contact@techcorp.com'), 
 (SELECT id FROM products WHERE sku = 'ENT-001'), 4999.99, 1, 'completed', 'credit_card'),
((SELECT id FROM customers WHERE email = 'info@startupxyz.com'),
 (SELECT id FROM products WHERE sku = 'BUS-002'), 899.99, 1, 'completed', 'paypal');
