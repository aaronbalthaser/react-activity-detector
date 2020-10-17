export const debounce = (callback: any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      return callback.apply(context, args);
    }, wait);
  };
};
