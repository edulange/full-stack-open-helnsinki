describe("Blog app", function () {
	beforeEach(function () {
		//cy.request("POST", "http://localhost:3003/api/testing/reset")
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)

		const user = {
			name: "Eduardo",
			username: "edugod",
			password: "292044",
		}
		//cy.request("POST", "http://localhost:3003/api/users/", user)
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
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
			cy.createBlog({
				title: "a blog created by cypress",
				author: "Cypress",
				url: "https://www.test.com/",
			})

			cy.contains("a blog created by cypress")
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

		describe("And several blogs exist", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "First blog",
					author: "Cypress",
					url: "https://www.test.com/",
				})
				cy.createBlog({
					title: "Second blog",
					author: "Cypress",
					url: "https://www.test.com/",
				})
				cy.createBlog({
					title: "Third blog",
					author: "Cypress",
					url: "https://www.test.com/",
				})
			})

			it("one of those can be liked", function () {
				cy.contains("Third blog").parent().find("button").click()
				cy.get(".like-btn").click()
			})

			it("one of those can be deleted", function () {
				cy.contains("Second blog").parent().find("button").click()
				cy.get(".delete").click()
			})

			describe("Different user", function () {
				it("different user logged in", function () {
					const newUser = {
						name: "Novo Usuário",
						username: "novousuario",
						password: "novasenha",
					}
		
					cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser)
					cy.login({ username: "novousuario", password: "novasenha" })
				})
				it('Button delete is not shown', function () {
					const newUser = {
						name: "Novo Usuário",
						username: "novousuario",
						password: "novasenha",
					}
		
					cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser)
					cy.login({ username: "novousuario", password: "novasenha" })

					cy.contains("Second blog").parent().find("button").click()
					cy.get("delete").should("not.exist")
				}) 
				it("they are ordered by the number of likes in descending order", async function () {
					cy.contains("Third blog").parent().find("button").click();
					cy.get(".like-btn").click().wait(500).click().wait(500);
					cy.get('.hide-btn').click()
			
					cy.contains("Second blog").parent().find("button").click();
					cy.get(".like-btn")
					  .click()
					  .wait(500)
					  .click()
					  .wait(500)
					  .click()
					  .wait(500);
			
					cy.get(".blog").eq(0).should("contain", "Second blog");
					cy.get(".blog").eq(1).should("contain", "Third blog");
					cy.get(".blog").eq(2).should("contain", "First blog");
				  });
			})
		})
		
	})
})
