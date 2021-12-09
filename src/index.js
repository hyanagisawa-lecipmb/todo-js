import "./styles.css";

const onClickAdd = () => {
  const inputtext = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputtext);
};

/**
 * 未完了リストから要素を削除する処理
 * target: 削除対象の要素
 */
const deleteIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

/**
 * 未完了のリストに要素を追加する処理
 */
const createIncompleteList = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";

  const li = document.createElement("li");
  li.innerText = text;

  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 完了ボタンの親タグを未完了TODOから削除
    deleteIncompleteList(completeButton.parentElement);

    // 完了リストに追加
    const addTarget = completeButton.parentNode;
    // // 親要素の最初の子要素を取得
    const addtext = addTarget.firstElementChild.innerText;
    addTarget.textContent = null;

    // 完了リストにliを生成
    const li = document.createElement("li");
    li.innerText = addtext;

    // 完了リストに戻るボタンを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻る";
    backButton.addEventListener("click", () => {
      // 完了リストから削除
      const deletetarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deletetarget);

      // テキストを取得
      const backtext = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(backtext);
    });

    // divタグの子要素に設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    console.log(addTarget);

    document.getElementById("complete-list").appendChild(addTarget);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    deleteIncompleteList(deleteButton.parentElement);
  });

  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
