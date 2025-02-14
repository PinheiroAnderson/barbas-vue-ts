import { Person } from "../domain/Person";
import { addPerson, editPerson, getPerson } from "../infra/person.repository";

export const personService = {
    add,
    get,
    edit,
};

function add(person: Person) {
    person.document = !person.document ? "" : person.document;
    person.gender = person.gender ?? "";
    person.photo = person.photo ?? "https://picsum.photos/100";

    addPerson(person)
        .then(res => {
            ///console.log(">>> Adicionado: ", res);
            alert("Adicionado com sucesso!");
        })
        .catch(error => {
            console.error("Error: ", error);
            alert("Error ao adicionar o usuário");
        });
}

async function get(id: string) {
    if (!id) throw new Error("Dados incompletos");
    return await getPerson(id);
}

function edit(person:Person){
  if(!person.id) throw new Error('Dados invalidos!');
  editPerson(person.id, person);

}
