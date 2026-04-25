import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItemAPI } from '../services/api';
import './AddItem.css';

function AddItem() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    phoneNumber: '',
    status: 'lost',
    date: new Date().toISOString().split('T')[0],
    imageUrl: ''
  });

  const locations = [
    'Main Cafeteria, Block A',
    'Examination Hall, Block C',
    'Central Library',
    'Parking Lot, Near Gate 2',
    'Computer Science Department',
    'Agriculture Faculty',
    'Student Hostel',
    'Sports Complex',
    'Administration Block',
    'Auditorium'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError('');
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageError('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError('File too large! Max 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imagePreview) {
      setImageError('Please upload an image (Required)');
      return;
    }
    
    setSubmitting(true);
    try {
      await createItemAPI(formData);
      alert('✅ Item reported successfully!');
      navigate(formData.status === 'lost' ? '/lost' : '/found');
    } catch (error) {
      alert('❌ Error reporting item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-card">
        <div className="form-header">
          <h1>📝 Report an Item</h1>
          <p>Fill in the details below. All fields marked * are required.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Status *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" value="lost" checked={formData.status === 'lost'} onChange={(e) => setFormData({...formData, status: e.target.value})} />
                <span>🔴 I Lost Something</span>
              </label>
              <label className="radio-label">
                <input type="radio" value="found" checked={formData.status === 'found'} onChange={(e) => setFormData({...formData, status: e.target.value})} />
                <span>🟢 I Found Something</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Item Title *</label>
            <input type="text" required className="form-input" placeholder="e.g., Black Leather Wallet, iPhone 13" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea required rows="4" className="form-textarea" placeholder="Describe the item in detail..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">Campus Location *</label>
            <select required className="form-select" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}>
              <option value="">Select Location</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="tel" required className="form-input" placeholder="0300-1234567" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input type="date" required className="form-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Picture * (Required)</label>
            <div className={`image-upload-area ${imageError ? 'error' : ''}`}>
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" id="imageUpload" required />
              <label htmlFor="imageUpload" className="file-label">📁 Choose Image</label>
              {imageError && <div className="image-error">{imageError}</div>}
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button type="button" className="remove-image" onClick={() => { setImagePreview(null); setFormData({...formData, imageUrl: ''}); document.getElementById('imageUpload').value = ''; }}>✖</button>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? '⏳ Submitting...' : '✅ Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;