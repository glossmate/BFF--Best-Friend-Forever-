import { useParams } from "react-router";
import useFetch from "./useFetch";
import { Button } from "@mui/material";

export default function DiaryView() {
    const {id} = useParams();
    const ONE_Diary = useFetch(window.location.protocol  + '//' + window.location.hostname + `:8055/Diary/${id}`);

    console.log(ONE_Diary);

    function GO_HOME() {
        window.location.replace("/");
    }

    function GO_MODIFY() {
        window.location.replace(`/DiaryModify/${id}`);
    }

    function GO_DELETE() {
      window.location.replace(`/DiaryDelete/${id}`);
  }

    return <div>
        <p>{ONE_Diary.DATE} : {ONE_Diary.TITLE}</p>
        <p>일기 내용 : <pre>{ONE_Diary.CONTENT}</pre></p>
        <Button
            variant="contained"
            color="success"
            style={{
              position: "absolute",
              backgroundColor: 'blue',
              right: 0,
              marginRight: "30px",
            }}
            onClick={GO_HOME}
          >
            목록보기
          </Button>

          <Button
            variant="contained"
            color="success"
            style={{
              position: "absolute",
              backgroundColor: 'blue',
              right: 0,
              marginRight: "130px",
            }}
            onClick={GO_MODIFY}
          >
            수정하기
          </Button>

          <Button
            variant="contained"
            color="success"
            style={{
              position: "absolute",
              backgroundColor: 'blue',
              right: 0,
              marginRight: "230px",
            }}
            onClick={GO_DELETE}
          >
            삭제하기
          </Button>


    </div>
}