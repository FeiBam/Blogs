function QuickShort(Arr,left,right) {
    if (Arr === null || Arr.length === 0 ){
        return
    }
    if (left > right){
        return
    }
    let Temp = 0
    let Key = Arr[left]
    let I = left
    let J = right
    while (I !== J){
        while ( I < J && Arr[J] >= Key){
            J --
        }
        while ( I < J && Arr[I] <= Key){
            I ++
        }
        if (I !== J){
            Temp = Arr[I]
            Arr[I] = Arr[J]
            Arr[J] = Temp
        }
    }
    Arr[left] = Arr[I]
    Arr[I] = Key
    QuickShort(Arr , I + 1 , right)
    QuickShort(Arr , left , I - 1)
}

function Main(Arr) {
    QuickShort(Arr , 0 , Arr.length - 1)
    return Arr
}


module.exports  = Main