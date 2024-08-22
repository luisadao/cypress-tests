describe("Login Tests", () => {
  beforeEach(() => {
    cy.visit("https://glarassist.com/");
    cy.get(".MuiDialogContent-root > .MuiButton-root").click();
  });

  context("after clicking get started button", () => {
    context("trying to login", () => {
      it("display login button", () => {
        cy.url().should("include", "/");
        cy.get("#userLogin").should("have.text", "Log in");
      });

      it("it can type login email", () => {
        cy.get("#userLogin").click();

        cy.url().should("include", "/login");

        // https://on.cypress.io/type
        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");

        // .type() with special character sequences
        cy.get("#loginEmail").type(
          "{leftarrow}{rightarrow}{uparrow}{downarrow}"
        );
        cy.get("#loginEmail").type("{del}{selectall}{backspace}");

        // .type() with key modifiers
        cy.get("#loginEmail").type("{alt}{option}"); //these are equivalent
        cy.get("#loginEmail").type("{ctrl}{control}"); //these are equivalent
        cy.get("#loginEmail").type("{meta}{command}{cmd}"); //these are equivalent
        cy.get("#loginEmail").type("{shift}");

        // Delay each keypress by 0.1 sec
        cy.get("#loginEmail").type("slow.typing@email.com", { delay: 100 });
        cy.get("#loginEmail").should("have.value", "slow.typing@email.com");
      });

      it("it can type login password", () => {
        cy.get("#userLogin").click();

        cy.url().should("include", "/login");
        // https://on.cypress.io/type
        cy.get("#loginPassword").type("fakepassword");
        cy.get("#loginPassword").should("have.value", "fakepassword");

        // .type() with special character sequences
        cy.get("#loginPassword").type(
          "{leftarrow}{rightarrow}{uparrow}{downarrow}"
        );
        cy.get("#loginPassword").type("{del}{selectall}{backspace}");

        // .type() with key modifiers
        cy.get("#loginPassword").type("{alt}{option}"); //these are equivalent
        cy.get("#loginPassword").type("{ctrl}{control}"); //these are equivalent
        cy.get("#loginPassword").type("{meta}{command}{cmd}"); //these are equivalent
        cy.get("#loginPassword").type("{shift}");

        // Delay each keypress by 0.1 sec
        cy.get("#loginPassword").type("slow.typing-fakepassword", {
          delay: 100,
        });
        cy.get("#loginPassword").should(
          "have.value",
          "slow.typing-fakepassword"
        );
      });

      it("try to login without email", () => {
        cy.get("#userLogin").click();

        cy.url().should("include", "/login");
        cy.get("form").submit();
        cy.get("#loginEmail-helper-text").should(
          "contain",
          "This field can't be empty"
        );
      });

      it("try to login without password", () => {
        cy.get("#userLogin").click();

        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");

        cy.get("form").submit();
        cy.get("#loginPassword-helper-text").should(
          "contain",
          "This field can't be empty"
        );
      });

      it("try to login with wrong email", () => {
        cy.get("#userLogin").click();

        cy.get("#loginEmail").type("fake@emailasdjnias.com");
        cy.get("#loginEmail").should("have.value", "fake@emailasdjnias.com");

        cy.get("#loginPassword").type("fakepassword");
        cy.get("#loginPassword").should("have.value", "fakepassword");

        cy.get("form").submit();
        cy.get("#loginEmail-helper-text").should(
          "contain",
          "Account does not exists"
        );
      });

      it("try to login with wrong password", () => {
        cy.get("#userLogin").click();

        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");

        cy.get("#loginPassword").type("fakepassword");
        cy.get("#loginPassword").should("have.value", "fakepassword");

        cy.get("form").submit();
        cy.get("#loginPassword-helper-text").should(
          "contain",
          "Incorrect password"
        );
      });
    });

    context("trying to login with SSO", () => {
      it("display SSO login button", () => {
        cy.get("#userLogin").click();
        cy.get("#userSSOLoginSubmit").should("have.text", "SSO Log in");
      });

      it("it can type login email", () => {
        cy.get("#userLogin").click();
        cy.get("#userSSOLoginSubmit").click();
        cy.url().should('include', '/login/sso')


        // https://on.cypress.io/type
        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");

        // .type() with special character sequences
        cy.get("#loginEmail").type(
          "{leftarrow}{rightarrow}{uparrow}{downarrow}"
        );
        cy.get("#loginEmail").type("{del}{selectall}{backspace}");

        // .type() with key modifiers
        cy.get("#loginEmail").type("{alt}{option}"); //these are equivalent
        cy.get("#loginEmail").type("{ctrl}{control}"); //these are equivalent
        cy.get("#loginEmail").type("{meta}{command}{cmd}"); //these are equivalent
        cy.get("#loginEmail").type("{shift}");

        // Delay each keypress by 0.1 sec
        cy.get("#loginEmail").type("slow.typing@email.com", { delay: 100 });
        cy.get("#loginEmail").should("have.value", "slow.typing@email.com");
      });

      it("it can type login organization", () => {
        cy.get("#userLogin").click();
        cy.get("#userSSOLoginSubmit").click();

        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");
        cy.url().should('include', '/login/sso')
        cy.get("form").submit();

        // https://on.cypress.io/type
        cy.get("#domain").type("fakedomain");
        cy.get("#domain").should("have.value", "fakedomain");

        // .type() with special character sequences
        cy.get("#domain").type("{leftarrow}{rightarrow}{uparrow}{downarrow}");
        cy.get("#domain").type("{del}{selectall}{backspace}");

        // .type() with key modifiers
        cy.get("#domain").type("{alt}{option}"); //these are equivalent
        cy.get("#domain").type("{ctrl}{control}"); //these are equivalent
        cy.get("#domain").type("{meta}{command}{cmd}"); //these are equivalent
        cy.get("#domain").type("{shift}");

        // Delay each keypress by 0.1 sec
        cy.get("#domain").type("slow.typing-fakedomain", { delay: 100 });
        cy.get("#domain").should("have.value", "slow.typing-fakedomain");
      });

      it("try to login without email", () => {
        cy.get("#userLogin").click();
        cy.get("#userSSOLoginSubmit").click();
        cy.url().should('include', '/login/sso')
        cy.get("form").submit();
        cy.get("#loginEmail-helper-text").should(
          "contain",
          "This field can't be empty"
        );
      });

      it("try to login without organization", () => {
        cy.get("#userLogin").click();
        cy.get("#userSSOLoginSubmit").click();
        cy.url().should('include', '/login/sso')
        
        cy.get("#loginEmail").type("fake@email.com");
        cy.get("#loginEmail").should("have.value", "fake@email.com");

        cy.get("form").submit();

        cy.get("#userLoginSubmit").click();
        cy.get("#domain-helper-text").should(
          "contain",
          "This field can't be empty"
        );
      });
    });
  });
});
