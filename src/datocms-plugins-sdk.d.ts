// declare module 'datocms-plugins-sdk' {
//     const init: (callback: (plugin: any) => void) => void;
//     // Add other necessary declarations based on your usage
//   }
  
//   export default init;

declare module 'datocms-plugins-sdk' {
  // Declare the functions and classes used in the SDK
    export const init: (callback: (plugin: any) => void) => void;
  // Add other declarations for SDK functions and classes as needed
}