export class EnsureModuleLoadedOnceGuard {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(targetModule: any) {
      if (targetModule) {
        throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
      }
    }
  
  }