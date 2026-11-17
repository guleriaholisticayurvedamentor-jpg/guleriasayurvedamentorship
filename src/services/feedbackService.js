import { supabase } from '../lib/supabaseClient'

// Submit new feedback (public users)
export const submitFeedback = async (customerName, customerRole, feedback, stars) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        customer_name: customerName,
        customer_role: customerRole,
        feedback: feedback,
        stars: stars,
        status: 'published'
      }
    ])
    .select()

  if (error) throw error
  return data
}

// Get all published feedback (public users)
export const getPublishedFeedback = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Get feedback statistics
export const getFeedbackStats = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('stars')
    .eq('status', 'published')

  if (error) throw error

  const totalReviews = data.length
  const averageRating = totalReviews > 0
    ? data.reduce((sum, review) => sum + review.stars, 0) / totalReviews
    : 0

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10
  }
}

// Subscribe to new feedback (realtime)
export const subscribeTofeedback = (callback) => {
  return supabase
    .channel('reviews_changes')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'reviews'
    }, callback)
    .subscribe()
}

// Admin: Get all feedback
export const getAllFeedback = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Admin: Delete feedback
export const deleteFeedback = async (id) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Admin: Update feedback status
export const updateFeedbackStatus = async (id, status) => {
  const { error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}
