import { supabase } from '../lib/supabaseClient'

// Get active media for public display
export const getActiveMedia = async (mediaType = null) => {
  let query = supabase
    .from('media')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (mediaType) {
    query = query.eq('media_type', mediaType)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

// Admin: Get all media
export const getAllMedia = async () => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Admin: Upload media file to storage
export const uploadMediaFile = async (file, bucket = 'website-images') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return {
    path: filePath,
    url: urlData.publicUrl
  }
}

// Admin: Create media record in database
export const createMediaRecord = async (mediaData) => {
  const { data, error } = await supabase
    .from('media')
    .insert([mediaData])
    .select()

  if (error) throw error
  return data[0]
}

// Admin: Delete media
export const deleteMedia = async (id, storagePath, bucket) => {
  // Delete from storage
  if (storagePath && bucket) {
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([storagePath])
    
    if (storageError) console.error('Storage delete error:', storageError)
  }

  // Delete from database
  const { error } = await supabase
    .from('media')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Admin: Update media visibility
export const updateMediaVisibility = async (id, isActive) => {
  const { error } = await supabase
    .from('media')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) throw error
}

// Admin: Update media order
export const updateMediaOrder = async (id, displayOrder) => {
  const { error } = await supabase
    .from('media')
    .update({ display_order: displayOrder })
    .eq('id', id)

  if (error) throw error
}

// Admin: Update media details
export const updateMediaDetails = async (id, title, description) => {
  const { error } = await supabase
    .from('media')
    .update({ title, description })
    .eq('id', id)

  if (error) throw error
}

// Get media statistics
export const getMediaStats = async () => {
  const { data, error } = await supabase
    .from('media')
    .select('media_type, is_active')

  if (error) throw error

  const stats = {
    totalImages: data.filter(m => m.media_type === 'image').length,
    totalVideos: data.filter(m => m.media_type === 'video').length,
    activeMedia: data.filter(m => m.is_active).length,
    hiddenMedia: data.filter(m => !m.is_active).length
  }

  return stats
}
