describe("Blog app", function () {
	beforeEach(function () {
		//cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

		const user = {
			name: "Eduardo",
			username: "edugod",
			password: "292044",
		}
		//cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.visit("")
	})

	it("Login form is shown", function () {
		cy.contains("username")
		cy.contains("password")
		cy.contains("login")
	})

	describe("Login", function () {
		it("fails with wrong credentials", function () {
			cy.get("#username").type("teste")
			cy.get("#password").type("teste")
			cy.get("#login-btn").click()
			cy.get(".error")
				.should("contain", "wrong username or password")
				.and("have.css", "color", "rgb(255, 0, 0)")
				.and("have.css", "border-style", "solid")

			cy.get("html").should("not.contain", "Eduardo logged in")
		})

		it("succeeds with correct credentials", function () {
			cy.get("#username").type("edugod")
			cy.get("#password").type("292044")
			cy.get("#login-btn").click()
			cy.get(".success")
				.should("contain", "Welcome Eduardo")
				.and("have.css", "color", "rgb(0, 128, 0)")
				.and("have.css", "border-style", "solid")
			cy.contains("Eduardo logged in")
		})
	})

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "edugod", password: "292044" })

			//cy.get("#login-btn").click()
			//cy.contains("Welcome Eduardo")
			cy.contains("Eduardo logged in")
		})

		it("A blog can be created", function () {
			cy.contains("New Blog").click()
			cy.get("#title").type("teste")
			cy.get("#author").type("teste")
			cy.get("#url").type("teste")
			cy.get("#create-btn").click()
			cy.contains("a new blog teste")
		})

		it("User can like a blog", function () {
			/*cy.contains("New Blog").click()
			cy.get("#title").type("teste")
			cy.get("#author").type("teste")
			cy.get("#url").type("teste")
			cy.get("#create-btn").click() */

			cy.createBlog({
				title: "teste",
				author: "teste",
				url: "teste",
			})

			cy.get("#view-btn").click()
			cy.get(".like-btn").click()
			cy.contains("Likes 1")
		})

		it("User can delete a blog", function () {
			/*cy.contains("New Blog").click()
			cy.get("#title").type("teste")
			cy.get("#author").type("teste")
			cy.get("#url").type("teste")
			cy.get("#create-btn").click() */
			cy.createBlog({
				title: "teste",
				author: "teste",
				url: "teste",
			})

			cy.get("#view-btn").click()
			cy.get(".delete").click()
		})
	})

  describe("Show delete button", function () {
		beforeEach(function () {
			cy.login({ username: "edugod", password: "292044" })

			//cy.get("#login-btn").click()
			//cy.contains("Welcome Eduardo")
			cy.contains("Eduardo logged in")
		})

    it('shouldnt show the button', function () {
      cy.get('#logout-btn').click()

			cy.login({ username: "teste", password: "teste" })
    })
  })

})
