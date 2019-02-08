var date = new Date();
var timestamp = date.getTime();
var email = "pruebaMiso"+timestamp+"@example.com"; 

describe('Crear usuarios', function() {
    it('Visits los estudiantes and create user', function() {
        cy.visit('https://losestudiantes.co')
	cy.contains('Cerrar').click()
	cy.contains('Ingresar').click()
	cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("pruebas")
      	cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("pppp pruebas")
	cy.get('.cajaSignUp').find('input[name="correo"]').click().type(email)
 	cy.get('.cajaSignUp').find('select[name="idPrograma"]').select("Administración")
	cy.get('.cajaSignUp').find('input[name="password"]').click().type("12345678")
	cy.get('.cajaSignUp').find('input[name="acepta"]').click().check() 
	cy.get('.cajaSignUp').contains('Registrarse').click()
	cy.contains('Verifica tu correo y activa tu cuenta Con esto ya podrás calificar profesores.')

    })
})


describe('Los estudiantes login', function() {
    it('Visits los estudiantes and success at login', function() {
        cy.visit('https://losestudiantes.co')
	cy.contains('Cerrar').click()
	cy.contains('Ingresar').click()
	cy.get('.cajaLogIn').find('input[name="correo"]').click().type(email)
      	cy.get('.cajaLogIn').find('input[name="password"]').click().type("12345678")
	cy.get('.cajaLogIn').contains('Ingresar').click()
	cy.get('#cuenta').click()

    })
})

describe('Crear con un usuario que ya existe', function() {
    it('Visits los estudiantes and fails create user', function() {
        cy.visit('https://losestudiantes.co')
	cy.contains('Cerrar').click()
	cy.contains('Ingresar').click()
	cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("pruebas")
      	cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("pppp pruebas")
	cy.get('.cajaSignUp').find('input[name="correo"]').click().type(email)
 	cy.get('.cajaSignUp').find('select[name="idPrograma"]').select("Administración")
	cy.get('.cajaSignUp').find('input[name="password"]').click().type("12345678")
	cy.get('.cajaSignUp').find('input[name="acepta"]').click().check() 
	cy.get('.cajaSignUp').contains('Registrarse').click()
	cy.contains("Error: Ya existe un usuario registrado con el correo '"+email+"'")

    })
})

describe('Busqueda de profesor', function() {
    it('teacher search', function() {
        cy.visit('https://losestudiantes.co')
	cy.contains('Cerrar').click()
	
	cy.get('input[role="combobox"]').click({force: true}).type("Mario Linares Vasquez", { force: true })
	cy.get('.Select-menu-outer').contains('Mario Linares Vasquez').click();
        cy.get('.nombreProfesor').contains("Mario Linares Vasquez")
	
    })
})


describe('Busqueda de profesor y aplicar filtros', function() {
    it('teacher search and filter', function() {
        cy.visit('https://losestudiantes.co')
	cy.contains('Cerrar').click()
	
	cy.get('input[role="combobox"]').click({force: true}).type("Mario Linares Vasquez", { force: true })
	cy.get('.Select-menu-outer').contains('Mario Linares Vasquez').click();
	
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(0).click();
	cy.get('.post').should('have.length', 7)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(0).click();
        cy.wait(2000)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(1).click();
	cy.get('.post').should('have.length', 7)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(1).click();
	cy.wait(2000)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(2).click();
	cy.get('.post').should('have.length', 0)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(2).click();
	cy.wait(2000)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(3).click();
	cy.get('.post').should('have.length', 4)
	cy.get('.statsProfesorDropdown').find('input[type="checkbox"]').eq(3).click();
       

    })
})
