// Update the path below to the actual relative path of your axiosConfig file, for example:
import axios from './axiosConfig'

const api = {
  home: {
    get: async () => {
      try {
        const response = await axios.get('home')
        return response.data?.content
      } catch (error) {
        throw error
      }
    },
  },
  about: {
    get: async () => {
      try {
        const response = await axios.get('about')
        return response.data?.content
      } catch (error) {
        throw error
      }
    },
  },
  contact: {
    create: async (contact) => {
      try {
        const response = await axios.post('contact', contact)
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
  order: {
    placeOrder: async (customerInfo, items) => {
      try {
        const response = await axios.post('order', {
          customerInfo,
          items,
        })
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
  discount: {
    applyCoupon: async (code, cart_total, shippingMethod) => {
      try {
        const response = await fetch('http://localhost:3001/api/discounts/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            cart_total,
            shippingMethod,
          }),
        })
        if (!response.ok) {
          throw new Error('Failed to apply coupon')
        }
        const data = await response.json()
        return data
      } catch (error) {
        throw error
      }
    },
  },
  location: {
    fetchProvinces: async () => {
      try {
        const response = await axios.get('https://api.vnappmob.com/api/v2/province/')
        return response.data.results
      } catch (error) {
        throw error
      }
    },
    fetchDistricts: async (provinceId) => {
      try {
        const response = await axios.get(`https://api.vnappmob.com/api/v2/province/district/${provinceId}`)
        return response.data.results
      } catch (error) {
        throw error
      }
    },
    fetchWards: async (districtId) => {
      try {
        const response = await axios.get(`https://api.vnappmob.com/api/v2/province/ward/${districtId}`)
        return response.data.results
      } catch (error) {
        throw error
      }
    },
  },
  product: {
    fetchAll: async () => {
      try {
        const response = await axios.get('product')
        return response.data
      } catch (error) {
        throw error
      }
    },
    fetchBestSelling: async () => {
      try {
        const response = await axios.get('product')
        return response.data.filter(product => product.bestSelling === true || product.bestSelling === 1)
      } catch (error) {
        throw error
      }
    },
    fetchSuggested: async () => {
      try {
        const response = await axios.get('product')
        return response.data.filter(product => product.suggestion === true)
      } catch (error) {
        throw error
      }
    },
    fetchById: async (id) => {
      try {
        const response = await axios.get(`product/${id}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
  news: {
    fetchAll: async () => {
      try {
        const response = await axios.get('news')
        return response.data
      } catch (error) {
        throw error
      }
    },
    fetchById: async (id) => {
      try {
        const response = await axios.get(`news/${id}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
  search: {
    fetchProducts: async (query) => {
      try {
        const response = await axios.get(`search/products?q=${encodeURIComponent(query)}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
}

export default api
