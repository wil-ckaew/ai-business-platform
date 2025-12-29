import { useMemo } from 'react'

export function useFormat() {
  const formatNumber = useMemo(() => {
    return (number, options = {}) => {
      const {
        style = 'decimal',
        minimumFractionDigits = 0,
        maximumFractionDigits = 2,
        currency = 'USD',
        locale = 'en-US'
      } = options

      const formatter = new Intl.NumberFormat(locale, {
        style,
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
      })

      return formatter.format(number)
    }
  }, [])

  const formatCurrency = useMemo(() => {
    return (amount, currency = 'USD', locale = 'en-US') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    }
  }, [])

  const formatDate = useMemo(() => {
    return (date, options = {}, locale = 'en-US') => {
      const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      }
      
      const dateObj = date instanceof Date ? date : new Date(date)
      return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj)
    }
  }, [])

  const formatDateTime = useMemo(() => {
    return (date, locale = 'en-US') => {
      const dateObj = date instanceof Date ? date : new Date(date)
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj)
    }
  }, [])

  return {
    formatNumber,
    formatCurrency,
    formatDate,
    formatDateTime,
  }
}
