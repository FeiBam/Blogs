function BubbleSort(arr) {
    const start = Date.now()
    let i = arr.length
    let j
    let temp;
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                tempExchangVal = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = templ;
            }
        }
        i--;
    }
    const end = Date.now() - start
    console.log(`UseTime:${end}ms`)
    return arr;
}