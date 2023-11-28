import { useParams } from "react-router"
import useFetch from "./useFetch";
import { Button } from "@mui/material";

export default function DiaryDelete() {
    const {id} = useParams();
    const ONE_Diary = useFetch(window.location.protocol  + '//' + window.location.hostname + `:8055/Diary/${id}`);

    function CONFIRM_DELETE() {
        fetch(window.location.protocol + '//' + window.location.hostname + `:8055/Diary/${id}`,{
            method: "DELETE",
        })
        .then(res => {
            if(res.ok) {
                alert('일기 : ' +JSON.stringify(ONE_Diary,null, ' ') + '를 삭제하였습니다.');
                window.location.replace("/");
            } else {
                alert('삭제하는 동안 오류가 발생했습니다.');
            }
        });
    }

    return <div>
        <h1>일기 삭제 확인</h1>
        <div>
            <p>일기 제목 : {ONE_Diary.TITLE}</p>
            <p>일기 내용 : </p>
                <pre>{ONE_Diary.CONTENT}</pre>
        </div>

        <Button
        variant="contained"
        style={{
          position: "absolute",
          right: 0,
          marginRight: "32px",
        }}
        onClick={CONFIRM_DELETE}
      >
        정말 삭제하기
      </Button>

    </div>
}