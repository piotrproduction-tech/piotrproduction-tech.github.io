export async function getItems() {
  return [
    { id: "1", name: "Element 1", status: "active" },
    { id: "2", name: "Element 2", status: "inactive" }
  ];
}

export async function getItemById(id) {
  return {
    id,
    name: "Element " + id,
    status: "active",
    description: "Opis elementu " + id
  };
}

export async function createItem(payload) {
  console.log("createItem (mock)", payload);
  return { success: true, id: String(Date.now()) };
}
