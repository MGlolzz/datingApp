export type Navigation = {
  navigate: (scene: string) => void;
  route: string;
  chatHeader: (header: string) => string;
};