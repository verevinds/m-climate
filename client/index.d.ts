declare module '*.svg' {
  const value: any;
  export default value;
}
declare module '*.scss';

declare module '*.tsx' {
  const content: Record<string, string>;
  export default content;
}
