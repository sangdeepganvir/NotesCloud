const capitalizeStr = (str) => {
    const trimStr = str.trim();
    const arr = trimStr.split(" ");
  
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1)
    }
  
    const str2 = arr.join(" ");
    return str2
  };

  
export { capitalizeStr };
