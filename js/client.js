export class AttemptClient {
    submit(formData) {
        return fetch(
            "/php/post.php",
            {
                method: "POST",
                body: formData
            }
        )
            .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(`${response.status}: ${response.statusText}. Something went wrong`)
                }
            )
    }

    deleteAll() {
        return fetch(
            "/php/delete.php",
            {method: "DELETE"}
        )
            .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(`${response.status}: ${response.statusText}. Something went wrong`)
                }
            )
    }

    getAll() {
        return fetch(
            "/php/get.php",
            {method: "GET"}
        )
            .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(`${response.status}: ${response.statusText}. Something went wrong`)
                }
            )
    }
}



