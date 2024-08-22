describe("Join Session Tests", () => {
  beforeEach(() => {
    cy.visit("https://glarassist.com/");
    cy.get(".MuiDialogContent-root > .MuiButton-root").click();
  });

  context("trying to join via join session", () => {
    it("display join button", () => {
      cy.get("#joinSession").should("have.text", "Join");
    });

    it("display join as a guest option", () => {
      cy.get("#joinSession").click();
      cy.get("#joinLoginAsAGuest").should("have.text", "Join as a Guest");
    });

    it("it can type guest name", () => {
      cy.get("#joinSession").click();
      cy.get("#joinLoginAsAGuest").click();
      cy.url().should('include', '/join')
      cy.get("#roomName").type("fakeName");
      cy.get("#roomName").should("have.value", "fakeName");

      // .type() with special character sequences
      cy.get("#roomName").type("{leftarrow}{rightarrow}{uparrow}{downarrow}");
      cy.get("#roomName").type("{del}{selectall}{backspace}");

      // .type() with key modifiers
      cy.get("#roomName").type("{alt}{option}"); //these are equivalent
      cy.get("#roomName").type("{ctrl}{control}"); //these are equivalent
      cy.get("#roomName").type("{meta}{command}{cmd}"); //these are equivalent
      cy.get("#roomName").type("{shift}");

      // Delay each keypress by 0.1 sec
      cy.get("#roomName").type("slow.typingFakeName", { delay: 100 });
      cy.get("#roomName").should("have.value", "slow.typingFakeName");
    });

    it("it can type room code", () => {
      cy.get("#joinSession").click();
      cy.get("#joinLoginAsAGuest").click();
      cy.url().should('include', '/join')
      cy.get("#roomCode").type("123456789");
      cy.get("#roomCode").should("have.value", "123 456 789");

      // .type() with special character sequences
      cy.get("#roomCode").type("{leftarrow}{rightarrow}{uparrow}{downarrow}");
      cy.get("#roomCode").type("{del}{selectall}{backspace}");

      // .type() with key modifiers
      cy.get("#roomCode").type("{alt}{option}"); //these are equivalent
      cy.get("#roomCode").type("{ctrl}{control}"); //these are equivalent
      cy.get("#roomCode").type("{meta}{command}{cmd}"); //these are equivalent
      cy.get("#roomCode").type("{shift}");

      cy.get("#roomCode").clear()

      // Delay each keypress by 0.1 sec
      cy.get("#roomCode").type("123456789", { delay: 100 });
      cy.get("#roomCode").should("have.value", "123 456 789");
    });

    it("try to join without name", () => {
      cy.get("#joinSession").click();
      cy.get("#joinLoginAsAGuest").click();
      cy.url().should('include', '/join')
      cy.get("form").submit();

      cy.get('#roomCode-helper-text').should('have.text','Unable to create new session. Please try again.')

    });

    it("try to join invalid sessoin", () => {
      cy.get("#joinSession").click();
      cy.get("#joinLoginAsAGuest").click();

      cy.url().should('include', '/join')
      cy.get("#roomName").type("fakeName");
      cy.get("#roomName").should("have.value", "fakeName");

      cy.get("#roomCode").type("123456789");
      cy.get("#roomCode").should("have.value", "123 456 789");

      cy.get("form").submit();

      cy.get('#roomCode-helper-text').should('have.text',"This session isn't available")

    });


    
  });
});
