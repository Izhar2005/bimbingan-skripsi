// JavaScript for Sistem Penjadwalan Bimbingan Skripsi
// Handles form validation, localStorage saving, reset, and notifications

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bimbinganForm');

  // Input elements
  const nama = form.nama;
  const nim = form.nim;
  const email = form.email;
  const topik = form.topik;
  const dosen = form.dosen;
  const tanggalWaktu = form.tanggalWaktu;

  // Error message elements
  const errorNama = document.getElementById('errorNama');
  const errorNim = document.getElementById('errorNim');
  const errorEmail = document.getElementById('errorEmail');
  const errorTopik = document.getElementById('errorTopik');
  const errorDosen = document.getElementById('errorDosen');
  const errorTanggalWaktu = document.getElementById('errorTanggalWaktu');

  // Helper function to show error message with animation
  function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden', 'opacity-0');
    element.classList.add('opacity-100', 'transition-opacity', 'duration-300');
  }

  // Helper function to hide error message with animation
  function hideError(element) {
    element.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => {
      element.classList.add('hidden');
      element.textContent = '';
    }, 300);
  }

  // Validate email format using regex
  function isValidEmail(email) {
    // Simple email regex pattern
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate NIM (assuming numeric and length 8-12 digits)
  function isValidNim(nim) {
    const nimStr = nim.toString();
    return /^\d{8,12}$/.test(nimStr);
  }

  // Validate all fields and show errors if any
  function validateForm() {
    let valid = true;

    // Nama Lengkap validation
    if (!nama.value.trim()) {
      showError(errorNama, 'Nama Lengkap wajib diisi.');
      valid = false;
    } else {
      hideError(errorNama);
    }

    // NIM validation
    if (!nim.value.trim()) {
      showError(errorNim, 'NIM wajib diisi.');
      valid = false;
    } else if (!isValidNim(nim.value.trim())) {
      showError(errorNim, 'NIM harus berupa angka 8-12 digit.');
      valid = false;
    } else {
      hideError(errorNim);
    }

    // Email validation
    if (!email.value.trim()) {
      showError(errorEmail, 'Email wajib diisi.');
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(errorEmail, 'Format email tidak valid.');
      valid = false;
    } else {
      hideError(errorEmail);
    }

    // Topik Skripsi validation
    if (!topik.value.trim()) {
      showError(errorTopik, 'Topik Skripsi wajib diisi.');
      valid = false;
    } else {
      hideError(errorTopik);
    }

    // Dosen Pembimbing validation
    if (!dosen.value) {
      showError(errorDosen, 'Pilih Dosen Pembimbing.');
      valid = false;
    } else {
      hideError(errorDosen);
    }

    // Tanggal dan Waktu Bimbingan validation
    if (!tanggalWaktu.value) {
      showError(errorTanggalWaktu, 'Pilih Tanggal dan Waktu Bimbingan.');
      valid = false;
    } else {
      hideError(errorTanggalWaktu);
    }

    return valid;
  }

  // Save form data to localStorage
  function saveToLocalStorage(data) {
    localStorage.setItem('jadwalBimbingan', JSON.stringify(data));
  }

  // Load form data from localStorage (optional enhancement)
  function loadFromLocalStorage() {
    const saved = localStorage.getItem('jadwalBimbingan');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        nama.value = data.nama || '';
        nim.value = data.nim || '';
        email.value = data.email || '';
        topik.value = data.topik || '';
        dosen.value = data.dosen || '';
        tanggalWaktu.value = data.tanggalWaktu || '';
      } catch {
        // Ignore JSON parse errors
      }
    }
  }

  // Reset form and clear errors
  function resetForm() {
    form.reset();
    [errorNama, errorNim, errorEmail, errorTopik, errorDosen, errorTanggalWaktu].forEach(hideError);
  }

  // Event listener for form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare data object
      const formData = {
        nama: nama.value.trim(),
        nim: nim.value.trim(),
        email: email.value.trim(),
        topik: topik.value.trim(),
        dosen: dosen.value,
        tanggalWaktu: tanggalWaktu.value,
      };

      // Save to localStorage
      saveToLocalStorage(formData);

      // Show success alert
      alert('Pengajuan Jadwal Terkirim');

      // Optionally reset form after submission
      resetForm();
    }
  });

  // Event listener for reset button to clear errors smoothly
  form.addEventListener('reset', (e) => {
    e.preventDefault();
    resetForm();
  });

  // Load saved data on page load
  loadFromLocalStorage();
});
