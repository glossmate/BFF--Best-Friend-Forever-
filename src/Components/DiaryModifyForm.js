import * as React from "react";
import { useParams } from "react-router"
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import useFetch from "./useFetch";

export default function DiaryModifyForm() {

    const REF_TITLE = React.useRef(null);
    const REF_CONTENT = React.useRef(null);

    const {id} = useParams();
    const OneDiary = useFetch(window.location.protocol  + '//' + window.location.hostname + `:8055/Diary/${id}`);
    console.log(OneDiary);

    if (OneDiary.TITLE === undefined) {
        return null;
    }

    function SAVE_DIARY() {
        const SAVE_DATA = {
          TITLE: REF_TITLE.current.value,
          CONTENT: REF_CONTENT.current.value,
        };
        console.log(SAVE_DATA);
    
        fetch(
          window.location.protocol +
            "//" +
            window.location.hostname +
            `:8050/Diary/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(SAVE_DATA),
          }
        ).then((RES) => {
          if (RES.ok) {
            alert("수정된 일기를 저장했습니다.");
            window.location.replace("/");
          }
        });
      }
    
      function GO_BACK() {
        window.location.replace("/");
      }
    
    return     <Box
    component="form"
    sx={{
      "& .MuiTextField-root": { m: 1, width: "100%" },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        inputRef={REF_TITLE}
        required
        id="DiaryTitle"
        label="제목"
        placeholder="내용을 입력해 주세요"
        defaultValue={OneDiary.TITLE}
      />
    </div>
    <div>
      <TextField
        inputRef={REF_CONTENT}
        required
        multiline
        rows={15}
        size="big"
        id="DiaryWriting"
        label="내용"
        placeholder="내용을 입력해 주세요"
        defaultValue={OneDiary.CONTENT}
      />
    </div>
    <Button
      variant="contained"
      style={{
        position: "absolute",
        right: 0,
        marginRight: "16px",
      }}
      onClick={SAVE_DIARY}
    >
      저장
    </Button>

    <Button
      variant="contained"
      style={{
        position: "absolute",
        left: 0,
        marginLeft: "32px",
      }}
      onClick={GO_BACK}
    >
      이전
    </Button>
  </Box>

}