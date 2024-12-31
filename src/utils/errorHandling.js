export const handleError = (error) => {
    console.error('Erreur:', error);
    alert('Une erreur s\'est produite, veuillez réessayer.');
  };
  
  export const handleApiError = (error) => {
    if (error.response) {
      alert(`Erreur API: ${error.response.data.message}`);
    } else if (error.request) {
      alert('Problème de réseau, veuillez vérifier votre connexion.');
    } else {
      alert('Erreur lors de la requête API.');
    }
  };
  