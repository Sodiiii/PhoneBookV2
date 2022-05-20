import React, { useState } from "react";
import { config } from "../source/config";
import Axios from "axios";

const AddPhone = () => {
  const [selectValue, setSelectValue] = useState("7");
  const [title, setTitle] = useState("");
  const [phoneList, setPhonelist] = useState([]);


  function selectVal(e) {
    setSelectValue(e.target.value);
  }

  function phoneValidate(e) {
    const val = e.target.value.replace(/\D/g, "").substr(0, 10);
    setTitle(val);
  }
  const handleSubmit = async (e) => {
    const phone = `+${selectValue} ${title}`;
    Axios.post("http://localhost:3001/create", { phone: phone }).then(() => {
      console.log("success");
      setPhonelist([...phoneList, { phone: phone }]);
    });
    e.preventDefault();
    setTitle("");
    console.log(phone);
  };

  setInterval((e) => {
    Axios.get("http://localhost:3001/phones").then((response) => {
      setPhonelist(response.data);
    });
  }, 3000);

  const flag = () => {
    let flag;
    config.map((x) => {
      if (selectValue == x.code) {
        flag = x.flag;
      }
    });
    return flag;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <select
          className={`phone_select ${flag()}`}
          value={selectValue}
          onChange={selectVal}
        >
          {config.map((area) => {
            return (
              <option key={area.country} value={area.code}>
                {" "}
                +{area.code}{" "}
              </option>
            );
          })}
        </select>
        <input
          type="tel"
          placeholder=""
          value={title}
          onChange={phoneValidate}
          minLength="3"
          maxLength="10"
          required
        />
      </div>
      <div className="btn_container">
        <button>Add number</button>
      </div>

      <div className="phone_list">
        <h3 className="base">Номера в базе:</h3>
        {phoneList.map((val, key) => {
          return <div key={val.id}>{val.phone}</div>;
        })}
      </div>
    </form>
  );
};

export default AddPhone;
