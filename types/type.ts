// Qui puoi inserire le tipizzazioni globali dell'applicazione

export interface NavigationType {
  path: string;
  element: React.ReactNode;
}

export interface ExampleBtn {
  handleClick: () => void;
  text: string;
  className: string;
}
