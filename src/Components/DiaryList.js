import { Link } from "react-router-dom";
import useFetch from "./useFetch";

export default function DiaryList() {

    const OBJ_DiaryList = useFetch(window.location.protocol  + '//' + window.location.hostname + ':8055/Diary');

    console.log(OBJ_DiaryList);

    return <ul>
        {OBJ_DiaryList.map((ONE_DIARY) => (
            <li key={ONE_DIARY.id}>
                <Link to={`/Diary/${ONE_DIARY.id}`}>
                    일기 제목 : {ONE_DIARY.TITLE}
                </Link>
            </li>
        ))}
    </ul>
}
