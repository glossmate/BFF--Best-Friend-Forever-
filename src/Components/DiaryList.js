import useFetch from "./useFetch";

export default function DiaryList() {
  const OBJ_DiaryList = useFetch(
    window.location.protocol + "//" + window.location.hostname + ":8050/Diary"
  );

  console.log(OBJ_DiaryList);

  return <div>일 기 목 록 입 니 다 만?</div>;
}
