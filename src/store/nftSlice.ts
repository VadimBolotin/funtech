import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface NftItem {
  id: string
  name: string
}

export type NftStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface NftState {
  items: NftItem[]
  status: NftStatus
  error: string | null
}

const initialState: NftState = {
  items: [],
  status: 'idle',
  error: null,
}

// Асинхронный thunk для получения NFT с публичного API
export const fetchNfts = createAsyncThunk<NftItem[]>(
  'nfts/fetchNfts',
  async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/nfts/list')

    if (!response.ok) {
      throw new Error('Не удалось загрузить NFT данные')
    }

    const data: Array<{ id: string; name: string }> = await response.json()

    // Берём все элементы из API, без ограничения по количеству
    return data.map((item) => ({
      id: item.id,
      name: item.name,
    }))
  }
)

const nftSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    // пример синхронного экшена, если понадобится
    clearNfts(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNfts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchNfts.fulfilled, (state, action: PayloadAction<NftItem[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchNfts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Произошла ошибка при загрузке NFT'
      })
  },
})

export const { clearNfts } = nftSlice.actions
export default nftSlice.reducer

