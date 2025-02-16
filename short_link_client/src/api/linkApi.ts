import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('Ошибка API:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Ошибка сети')
    }
    throw error
}

export const createShortLink = async (originalUrl: string, alias?: string, expiresDate?: Date) => {
    try {
        const response = await api.post<string>('/shorten', { originalUrl, alias, expiresDate })
        return response.data
    } catch (error) {
        handleApiError(error)
    }
}

export const getLinkInfo = async (shortUrl: string) => {
    try {
        const response = await api.get(`/info/${shortUrl}`)
        return response.data
    } catch (error) {
        handleApiError(error)
    }
}

export const getLinkAnalytics = async (shortUrl: string) => {
    try {
        const response = await api.get(`/analytics/${shortUrl}`)
        return response.data
    } catch (error) {
        handleApiError(error)
    }
}

export const deleteLink = async (shortUrl: string) => {
    try {
        await api.delete(`/delete/${shortUrl}`)
    } catch (error) {
        handleApiError(error)
    }
}
