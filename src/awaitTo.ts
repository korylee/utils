export  function awaitTo<T extends any, R extends undefined>(
  promise: Promise<T>,
  {
    errorExt = {},
    initialValue = undefined,
  }: {
    errorExt?: any,
    initialValue?: R,
  } = {}
) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) Object.assign(err, errorExt)
      return [err, initialValue]
    })
}

export  default awaitTo