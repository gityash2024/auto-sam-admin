import Swal from "sweetalert2";

export const helper = {
  sweetalert: { toast, confirm },
  userDetail: { user },
  capitalizeLetter,
  generateRandomStrings,
  generateRandomNumber
};

export function toast(title, icon = "success") {
  Swal.fire({
    title: title,
    icon: icon,
    toast: true,
    timer: 5000,
    timerProgressBar: false,
    showConfirmButton: false,
    position: "top"
  });
}

export function confirm(title, icon = "success", cancelButton = false) {
  return Swal.fire({
    title: title,
    icon: icon,
    confirmButtonText: 'Yes',
    showConfirmButton: true,
    showCancelButton: cancelButton,
    confirmButtonColor: '#008bd6',
    cancelButtonColor: '#d33',
  });
}

export function capitalizeLetter(string) {
  if (string != "") {
    const words = string.split(" ");
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedString = capitalizedWords.join(" ");
    return capitalizedString;
  } else {
    return string;
  }
}

export function user() {
  //console.log(sessionStorage.getItem("userinfo"));
  return JSON.parse(sessionStorage.getItem("userinfo"));
}

export function generateRandomStrings(length = 10) {
  let randomString = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    const randomChar = chars.charAt(randomIndex);
    randomString += randomChar;
  }
  return randomString;
}

export function generateRandomNumber(max = 1000) {
  return Math.floor(Math.random() * max) + 1
};