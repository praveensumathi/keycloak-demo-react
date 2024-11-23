import { useEffect, useState } from "react";
import { _axios } from "..";

const BookList = () => {
  const [email, setEmail] = useState("");

  const getUserEmail = () => {
    _axios.get("/profile").then((response) => {
      if (response && response.data) {
        setEmail(response.data);
      }
    });
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12">
        <h1>Books to Read Before You Die</h1>
        <h1>{email}</h1>
      </div>
    </div>
  );
};

export default BookList;
