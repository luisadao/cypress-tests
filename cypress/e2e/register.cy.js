describe("Registration Tests", () => {
  beforeEach(() => {
    cy.visit("https://glarassist.com/");
    cy.get(".MuiDialogContent-root > .MuiButton-root").click();
  });

  context("trying to register", () => {
    it("display create account link", () => {
      cy.get("#userRegistration").should("have.text", "Create one");
    });

    it("it can type signin email", () => {
      cy.get("#userRegistration").click();

      cy.url().should('include', '/sign_in')

      // https://on.cypress.io/type
      cy.get("#signinEmail").type("fake@email.com");
      cy.get("#signinEmail").should("have.value", "fake@email.com");

      // .type() with special character sequences
      cy.get("#signinEmail").type(
        "{leftarrow}{rightarrow}{uparrow}{downarrow}"
      );
      cy.get("#signinEmail").type("{del}{selectall}{backspace}");

      // .type() with key modifiers
      cy.get("#signinEmail").type("{alt}{option}"); //these are equivalent
      cy.get("#signinEmail").type("{ctrl}{control}"); //these are equivalent
      cy.get("#signinEmail").type("{meta}{command}{cmd}"); //these are equivalent
      cy.get("#signinEmail").type("{shift}");

      // Delay each keypress by 0.1 sec
      cy.get("#signinEmail").type("slow.typing@email.com", { delay: 100 });
      cy.get("#signinEmail").should("have.value", "slow.typing@email.com");
    });

    it("it can type signin password", () => {
      cy.get("#userRegistration").click();
      cy.url().should('include', '/sign_in')
      // https://on.cypress.io/type
      cy.get("#signinPassword").type("fakepassword");
      cy.get("#signinPassword").should("have.value", "fakepassword");

      // .type() with special character sequences
      cy.get("#signinPassword").type(
        "{leftarrow}{rightarrow}{uparrow}{downarrow}"
      );
      cy.get("#signinPassword").type("{del}{selectall}{backspace}");

      // .type() with key modifiers
      cy.get("#signinPassword").type("{alt}{option}"); //these are equivalent
      cy.get("#signinPassword").type("{ctrl}{control}"); //these are equivalent
      cy.get("#signinPassword").type("{meta}{command}{cmd}"); //these are equivalent
      cy.get("#signinPassword").type("{shift}");

      // Delay each keypress by 0.1 sec
      cy.get("#signinPassword").type("slow.typing-fakepassword", {
        delay: 100,
      });
      cy.get("#signinPassword").should(
        "have.value",
        "slow.typing-fakepassword"
      );
    });

    it("try to signin without email", () => {
      cy.get("#userRegistration").click();
      cy.url().should('include', '/sign_in')

      cy.get("form").submit();
      cy.get("#signinEmail-helper-text").should(
        "contain",
        "This field can't be empty"
      );
    });

    it("try to signin without password", () => {
      cy.get("#userRegistration").click();
      cy.url().should('include', '/sign_in')

      cy.get("#signinEmail").type("fake@email.com");
      cy.get("#signinEmail").should("have.value", "fake@email.com");

      cy.get("form").submit();
      cy.get("#signinPassword-helper-text").should(
        "contain",
        "This field can't be empty"
      );
    });
  });
});
