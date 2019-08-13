export interface BookProps {
    bookText?: string;
    bookSpread?: number;
    coverImage?: string;
    spreads?: number;
  }
  
  export interface BookState {
    currentSpread: number;
    direction: string;
    stateBookText: string;
  }