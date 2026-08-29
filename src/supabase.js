import { createClient } from '@supabase/supabase-js'

// Tu URL directa de tu proyecto en Ohio
const supabaseUrl = 'https://phpveodubvpozbwtrwac.supabase.co'

// Aquí pegas la Publishable key enterita que acabas de copiar
const supabaseKey = 'sb_publishable_XMkQWvKrcRNN4SlKjDel1g_B3Rn6ARK' 

// Creamos y exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)