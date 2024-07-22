// Select the input element and root element for the movie list
let input = document.querySelector('input[type="text"]');
let rootElm = document.querySelector(".movies_list");

// Initial list of movies
let allMovies = [
  {
    name: "Forest Gump",
    watched: false,
  },
  {
    name: "Inception",
    watched: true,
  },
];

// Event listener to add a new movie on Enter key press
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && event.target.value) {
    allMovies.push({
      name: event.target.value,
      watched: false,
    });
    event.target.value = "";
    createMovieUI(allMovies, rootElm);
  }
});

// Function to handle checkbox change events
function handleChange(event) {
  let index = event.target.id;
  allMovies[index].watched = !allMovies[index].watched;
  createMovieUI(allMovies, rootElm);
}

// Function to handle delete events
function handleDelete(event) {
  let index = event.target.dataset.id;
  allMovies.splice(index, 1);
  createMovieUI(allMovies, rootElm);
}

// Function to create the movie UI
function createMovieUI(data, root) {
  // Clear the existing content

  // Create and append each movie item
  const allMoviestoWatch = data.map((movie, i) => {
    // React.createElement(
    //     "li",
    //     { classList: ["flex", "justify-between", "my-4", "w-custom", "movie"] },
    //     React.createElement("label", { htmlFor: `checkbox-${i}` }, movie.name),
    //     React.createElement(
    //         "span",
    //         { id: `status-${i}`, className: ["btn", "btn-primary"] },
    //         movie.watched ? "Watched" : "To watch"
    //     ),
    //     React.createElement(
    //         'input', {
    //             type: 'checkbox',
    //             id: `checkbox-${i}`,
    //             'data-id': i,
    //             checked: movie.watched,
    //             onChange: handleChange }
    //     ),
    //     React.createElement(
    //         "span",
    //         { className: ["cursor-pointer"], 'data-id': i, onClick: handleDelete },
    //         '❌'
    //     )
    // );
    return (
      <li key={movie.name}>
        <label htmlFor={"a"+i}>
          {movie.name}
        </label>
        <button id={i} className="btn btn-primary" onClick={handleChange}>
          {movie.watched ? "Watched" : "To Watch"}
        </button>

        <input
          type="checkbox"
          id={"a"+i}
          checked={movie.watched}
        ></input>
        <span className="cursor-pointer" data-id={i} onClick={handleDelete}>
          ❌
        </span>
      </li>
    );
  });
  ReactDOM.render(allMoviestoWatch, root);
}

// Function to create elements with attributes and children
// function createElement(type, attr = {}, ...children) {
//     let element = document.createElement(type);
//     for (let key in attr) {
//         if (key === "classList") {
//             // Handle classList separately
//             if (Array.isArray(attr[key])) {
//                 attr[key].forEach((className) => element.classList.add(className));
//             }
//         } else if (key.startsWith("data-")) {
//             // Set data attributes
//             element.setAttribute(key, attr[key]);
//         } else if (key.startsWith("on") && typeof attr[key] === "function") {
//             // Add event listeners
//             element.addEventListener(key.substring(2).toLowerCase(), attr[key]);
//         } else {
//             // Set other attributes and properties
//             element[key] = attr[key];
//         }
//     }
//     children.forEach((child) => {
//         if (typeof child === "object") {
//             element.append(child);
//         }
//         if (typeof child === "string") {
//             let node = document.createTextNode(child);
//             element.append(node);
//         }
//     });
//     return element;
// }

// Initial call to create the UI with the initial list of movies
createMovieUI(allMovies, rootElm);
