function atMostSum(arr, k)
{
    let sum = 0;
    let count = 0;
    let maxcount = 0;

    for(let i = 0; i < arr.length; i++)
    {
        // If adding current element
        // doesn't cross limit add
        // it to current window
        if ((sum + arr[i]) <= k)
        {
            sum += arr[i] ;
            count += 1 ;
        }
        // Else, remove first element
        // of current window and add
        // the current element
        else if(sum != 0){
          sum = sum - arr[i - count] + arr[i];
        }

        // keep track of max length.
        maxcount = max(count, maxcount);
    }
    return maxcount;
}
