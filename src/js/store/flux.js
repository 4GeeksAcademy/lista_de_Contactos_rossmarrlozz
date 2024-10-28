const getState = ({ getStore, setStore, getActions }) => {
	let debounceTimer; // Variable para manejar el temporizador
	let isFetching = false; // Estado para saber si se están recuperando datos

	return {
		store: {
			contactList: [],
			idDelete: "",
			contactToEdit: {},
			agendaSlug: "agenda_Mariana",
			loading: false, // Estado de carga
			error: null // Estado de error
		},
		actions: {
			getData: async () => {
				const store = getStore();
				if (debounceTimer) clearTimeout(debounceTimer); // Limpiar el temporizador anterior

				debounceTimer = setTimeout(async () => {
					if (isFetching) return; 
					isFetching = true; // Cambiar el estado a "cargando"
					setStore({ loading: true, error: null }); // Establecer estado de carga

					try {
						const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`);
						if (!response.ok) throw new Error(`Error fetching contacts: ${response.status}`);

						const data = await response.json();
						console.log("Contacts fetched successfully:", data);

						if (Array.isArray(data.contacts)) {
							setStore({ contactList: data.contacts });
						} else {
							console.error("Expected an array, but got:", data);
							setStore({ contactList: [] });
						}
					} catch (error) {
						console.error("Error fetching contacts:", error);
						setStore({ error: error.message });
					} finally {
						isFetching = false; // Restablecer el estado de "cargando"
						setStore({ loading: false }); // Ocultar el indicador de carga
					}
				}, 1000); // Espera 1000 ms antes de llamar a la API nuevamente
			},

			createAgenda: async (agendaSlug) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ agenda_slug: agendaSlug })
					});

					if (!response.ok) throw new Error(`Error creating agenda: ${response.status} ${response.statusText}`);

					const data = await response.json();
					console.log("Agenda created successfully:", data);
				} catch (error) {
					console.error("Error creating agenda:", error);
				}
			},

			addContact: async (newContact) => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(newContact)
					});

					if (!response.ok) throw new Error(`Error adding contact: ${response.status}`);

					const addedContact = await response.json();
					console.log("Contact added successfully:", addedContact);

					getActions().getData();
					return true;  
				} catch (error) {
					console.error("Error adding contact:", error);
					return false;  
				}
			},

			addidDelete: (id) => {
				setStore({ idDelete: id });
			},

			removeContact: async () => {
				const store = getStore();
				const idToDelete = store.idDelete; 

				if (!idToDelete) {
					console.error("No hay ID para eliminar");
					return;
				}

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${idToDelete}`, {
						method: 'DELETE',
					});

					if (!response.ok) {
						const errorText = await response.text();
						console.error("Error deleting contact:", errorText);
						throw new Error(`Error deleting contact: ${response.status} ${errorText}`);
					}

					console.log("Contact deleted successfully.");
					getActions().getData(); 
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},

			editContact: async (id, updatedContact) => {
				const store = getStore(); 
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedContact) 
					});
			
					if (response.ok) {
						const updatedContactData = await response.json();
			
						const updatedContactList = store.contactList.map(contact =>
							contact.id === parseInt(id) ? updatedContactData : contact
						);
			
						setStore({ contactList: updatedContactList });
						return updatedContactData; 
					} else {
						const errorText = await response.text();
						console.error("Error al actualizar el contacto:", errorText);
						throw new Error("No se pudo actualizar el contacto.");
					}
				} catch (error) {
					console.error("Error actualizando contacto:", error);
					throw error; 
				}
			},
			
			getContactById: async (id) => {
				const store = getStore();
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`);
				if (!response.ok) throw new Error(`Error fetching contact: ${response.status}`);
				return await response.json();
			},


			getContact: (contact) => {
				setStore({ contactToEdit: contact });
			}
		}
	};
};

export default getState;
