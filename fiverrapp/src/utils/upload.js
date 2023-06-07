import newRequest from "./newRequest";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fiverr");

  try {
    const res = newRequest.post("auth/upload", formData)

  } catch (err) {
    console.log(err);
  }
};
