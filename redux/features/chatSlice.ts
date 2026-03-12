import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
  input: string
  mermaidCode: string
  explanationMarkdown: string
  isLoading: boolean
  error: string | null
}

const initialState: ChatState = {
  input: '',
  mermaidCode: '',
  explanationMarkdown: '',
  isLoading: false,
  error: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setDiagramAndExplanationMarkdown: (state, action: PayloadAction<{ mermaidCode: string; explanationMarkdown: string }>) => {
      state.mermaidCode = action.payload.mermaidCode
      state.explanationMarkdown = action.payload.explanationMarkdown
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setInput, setLoading, setDiagramAndExplanationMarkdown, setError } = chatSlice.actions
export default chatSlice.reducer
