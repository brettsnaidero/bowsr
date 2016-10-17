function brandConvert(name) {
  let answer;
  switch(name) {
    case "Caltex":
      answer = "caltex";
      break;
    case "Caltex Woolworths":
      answer = "caltexWoolworths";
      break;
    case "Shell":
      answer = "shell";
      break;
    case "Costco":
      answer = "costco";
      break;
    case "7-Eleven":
      answer = "sevenEleven";
      break;
    case "Metro Fuel":
      answer = "metroFuel";
      break;
    case "Mobil":
      answer = "mobil";
      break;
    case "Budget":
      answer = "budget";
      break;
    case "BP":
      answer = "bp";
      break;
    case "Speedway":
      answer = "speedway";
      break;
    case "Coles Express":
      answer = "colesExpress";
      break;
    // case "Puma Energy":
    //   answer = "puma";
    //   break;
    // case "Matilda":
    //   answer = "matilda";
    //   break;
    // case "Westside":
    //   answer = "westside";
    //   break;
    // case "Liberty":
    //   answer = "liberty";
    //   break;
    // case "Lowes":
    //   answer = "lowes";
    //   break;
    // case "Prime Petroleum":
    //   answer = "prime";
    //   break;
    default:
      answer = "independent";
  }
  return answer;
}

export default brandConvert;
