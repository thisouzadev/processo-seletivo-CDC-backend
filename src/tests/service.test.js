const employerService = require('../service/employes.service.js');

describe('EmployersService', () => {
  describe('create', () => {
    it('should create a new employer', async () => {
      // nome, cpf, departamento, salario, data_de_nascimento
      const response = await employerService.create('thiago', '146.187.158-87', 'TI', 'R$: 362', '10/10/1990');
      expect(response).toBeDefined();
    }
    );
  }
  );
  describe('getAll', () => {
    it('should get all employers', async () => {
      const response = await employerService.findAll();
      expect(response).toBeDefined();
    }
    );
  }
  );
  describe('update', () => {
    it('should update an employer', async () => {
      const response = await employerService.update(1, 'teste', '12345678901', 'teste', 'teste', 'teste');
      expect(response).toBeDefined();
    }
    );
  }
  );
  describe('deleteEmployer', () => {
    it('should delete an employer', async () => {
      const response = await employerService.deleteEmployer(1);
      expect(response).toBeDefined();
    }
    );
  }
  );
  describe('findByPrimaryKey', () => {
    it('should find an employer by primary key', async () => {
      const response = await employerService.findByPrimaryKey(1);
      expect(response).toBeDefined();
    }
    );
  }
  );
  describe('getEmployeByNameAndDepartament', () => {
    it('should get an employer by name and departament', async () => {
      const response = await employerService.getEmployeByNameAndDepartament('teste', 'teste');
      expect(response).toBeDefined();
    }
    );
  }
  );
});
