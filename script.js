var task = [];
const dialogue = document.querySelector("dialog");
document.addEventListener("DOMContentLoaded", () => {
	const addForm = document.querySelector("#taskInputForm");

	if (JSON.parse(localStorage.getItem("taskArr"))) {
		task = JSON.parse(localStorage.getItem("taskArr"));
		loadTask(task);
	}

	document.querySelector("ul").onclick = (e) => {
		console.log(
			"ul clicked",
			e.target.closest("li"),
			e.target.tagName.toLowerCase() == "li",
		);
		if (e.target.tagName.toLowerCase() == "li") {
			toggleCompleted(e.target);
		} else if (
			e.target.tagName.toLowerCase() == "img" &&
			e.target.classList.contains("delBtn")
		) {
			delTask(e.target);
		} else if (
			e.target.tagName.toLowerCase() == "img" &&
			e.target.classList.contains("editBtn")
		) {
			editTask(e.target);
		}
	};

	addForm.onsubmit = (e) => {
		e.preventDefault();
		const obj = {
			id: Math.random() * 10 + 1,
			content: document.querySelector("#addTaskInput").value,
			completed: false,
		};
		task.push(obj);
		loadTask(task);
		toggleCompleted();
	};
});

const loadTask = (task) => {
	localStorage.setItem("taskArr", JSON.stringify(task));
	const ul = document.querySelector("ul");
	ul.innerHTML = task
		.map(
			({ id, content, completed }) =>
				`
          <li data-id=${id} id=${id}  ${completed == true ? "class='checked'" : ""}>
        ${content}
           <img
                class="delBtn"
                src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000"
                alt=""
            />
              <img
                class="editBtn"
                src="https://img.icons8.com/?size=100&id=102714&format=png&color=000000"
                alt=""
              />
            </li>
        `,
		)
		.join("");
};

const toggleCompleted = (target) => {
	task = task.map((i) => {
		if (i.id == parseFloat(target.id)) {
			return { id: i.id, content: i.content, completed: !i.completed };
		}
		return i;
	});
	loadTask(task);
};

const delTask = (target) => {
	task = task.filter((u) => parseFloat(target.closest("li").id) != u.id);
	loadTask(task);
};

const editTask = (target) => {
	dialogue.showModal();
	// dialogue.showModal();
	document.getElementById("editForm").onsubmit = (e) => {
		e.preventDefault();
		console.log(document.getElementById("editInput").value);
		task = task.map((gg) => {
			if (parseFloat(target.closest("li").id) == gg.id) {
				return {
					...gg,
					content: document.getElementById("editInput").value,
				};
			} else {
				return gg;
			}
		});
		loadTask(task);
		dialogue.close();
	};
};

dialogue.onclick = (e) => {
	const dialogrect = dialogue.getBoundingClientRect();
	if (
		e.clientX < dialogrect.left ||
		e.clientX > dialogrect.right ||
		e.clientY < dialogrect.top ||
		e.clientY > dialogrect.bottom
	) {
		dialogue.close();
	}
};
