import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    projectType: 'Individual',
    role: '',
    projectSector: '',
    tools: '',
    techStack: '',
    contextDescription: '',
    targetCustomerDescription: '',
    goalDescription: '',
    effortAndContributionsDescription: '',
    projectUrl: '',
    githubUrl: '',
    status: 'Completed',
    featured: false
  });
  const [uploadedImages, setUploadedImages] = useState({
    context: [],
    targetCustomer: [],
    goal: [],
    effortAndContributions: []
  });

  const API_URL = 'http://localhost:5000/api/projects';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Error fetching projects: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e, section) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) {
        alert('Please upload only image files');
        return false;
      }
      if (!isValidSize) {
        alert('File size must be less than 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedImages(prev => ({
        ...prev,
        [section]: [...prev[section], ...validFiles]
      }));
    }

    e.target.value = '';
  };

  const removeImage = (section, index) => {
    setUploadedImages(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const uploadImagesToServer = async (files) => {
  const uploadedUrls = [];
  
  for (const file of files) {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('http://localhost:5000/api/upload', {  
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      uploadedUrls.push(result.url);  // This will be /uploads/filename.jpg
    } catch (error) {
      console.error('Error uploading image:', error);
      uploadedUrls.push(`/uploads/${file.name}`); 
    }
  }
  
  return uploadedUrls;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const contextImages = await uploadImagesToServer(uploadedImages.context);
      const targetCustomerImages = await uploadImagesToServer(uploadedImages.targetCustomer);
      const goalImages = await uploadImagesToServer(uploadedImages.goal);
      const effortImages = await uploadImagesToServer(uploadedImages.effortAndContributions);
      const slug = generateSlug(formData.title);  
      const formatPictures = (urls) => urls.map(url => ({ url, caption: '' }));

      const projectData = {
        title: formData.title,
        projectType: formData.projectType,
        role: formData.role,
        projectSector: formData.projectSector,
        tools: formData.tools ? formData.tools.split(',').map(t => t.trim()).filter(t => t) : [],
        techStack: formData.techStack ? formData.techStack.split(',').map(t => t.trim()).filter(t => t) : [],
        context: { 
          description: formData.contextDescription, 
          pictures: formatPictures(contextImages)
        },
        targetCustomer: { 
          description: formData.targetCustomerDescription, 
          pictures: formatPictures(targetCustomerImages)
        },
        goal: { 
          description: formData.goalDescription, 
          pictures: formatPictures(goalImages)
        },
        effortAndContributions: {
          description: formData.effortAndContributionsDescription,
          pictures: formatPictures(effortImages)
        },
        projectUrl: formData.projectUrl.trim() || `http://localhost:3000/projects/${slug}`,
        githubUrl: formData.githubUrl,
        status: formData.status,
        featured: formData.featured
      };

      console.log('Sending project data:', projectData);

      let response;
      if (editingProject) {
        response = await fetch(`${API_URL}/${editingProject._id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData)
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(editingProject ? 'Project updated:' : 'Project created:', result);
      
      resetForm();
      fetchProjects();
      alert(`Project ${editingProject ? 'updated' : 'created'} successfully!`);
      
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = (project) => {
  setEditingProject(project);
  setFormData({
    title: project.title || '',
    projectType: project.projectType || 'Individual',
    role: project.role || '',
    projectSector: project.projectSector || '',
    tools: Array.isArray(project.tools) ? project.tools.join(', ') : '',
    techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
    contextDescription: project.context?.description || '',
    targetCustomerDescription: project.targetCustomer?.description || '',
    goalDescription: project.goal?.description || '',
    effortAndContributionsDescription: project.effortAndContributions?.description || '',
    projectUrl: project.projectUrl || '',
    githubUrl: project.githubUrl || '',
    status: project.status || 'Completed',
    featured: project.featured || false
  });

  // THIS IS THE KEY: Show existing images from DB
  setUploadedImages({
    context: project.context?.pictures || [],
    targetCustomer: project.targetCustomer?.pictures || [],
    goal: project.goal?.pictures || [],
    effortAndContributions: project.effortAndContributions?.pictures || []
  });

  setIsFormOpen(true);
};
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`, { 
          method: 'DELETE' 
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Project deleted successfully');
        fetchProjects();
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')       
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  const resetForm = () => {
    setFormData({
      title: '',
      projectType: 'Individual',
      role: '',
      projectSector: '',
      tools: '',
      techStack: '',
      contextDescription: '',
      targetCustomerDescription: '',
      goalDescription: '',
      effortAndContributionsDescription: '',
      projectUrl: '',
      githubUrl: '',
      status: 'Completed',
      featured: false
    });
    setUploadedImages({
      context: [],
      targetCustomer: [],
      goal: [],
      effortAndContributions: []
    });
    setEditingProject(null);
    setIsFormOpen(false);
  };

  const ImageUploadSection = ({ title, section, description, value, onChange }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title} *
      </label>
      <textarea
        name={description}
        value={value}
        onChange={onChange}
        required
        rows="3"
        disabled={loading}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        placeholder={`Describe the ${title.toLowerCase()}...`}
      />
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">Click to upload images</span>
          <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e, section)}
            className="hidden"
            disabled={loading}
          />
        </label>
      </div>

     {uploadedImages[section].length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {uploadedImages[section].map((img, index) => {
              // img can be File object (new) or { url: "..." } (existing)
              const isFile = img instanceof File;
              const src = isFile ? URL.createObjectURL(img) : `http://localhost:5000${img.url}`;

              return (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border"
                    onError={() => console.log('Failed to load:', src)}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(section, index)}
                    disabled={loading}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="text-xs text-gray-500 truncate mt-1">
                    {isFile ? img.name : img.url.split('/').pop()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Project Admin Panel</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
            <div className="text-lg font-medium text-gray-700">Loading...</div>
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button 
                  onClick={resetForm} 
                  disabled={loading}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Group">Group</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Academic">Academic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      placeholder="e.g., Full-stack Developer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Sector *
                    </label>
                    <input
                      type="text"
                      name="projectSector"
                      value={formData.projectSector}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      placeholder="e.g., AI/ML, Web Development"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tools (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tools"
                      value={formData.tools}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Python, Figma, Postman"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <ImageUploadSection
                  title="Context"
                  section="context"
                  description="contextDescription"
                  value={formData.contextDescription}
                  onChange={handleInputChange}
                />

                <ImageUploadSection
                  title="Target Customer"
                  section="targetCustomer"
                  description="targetCustomerDescription"
                  value={formData.targetCustomerDescription}
                  onChange={handleInputChange}
                />

                <ImageUploadSection
                  title="Goal"
                  section="goal"
                  description="goalDescription"
                  value={formData.goalDescription}
                  onChange={handleInputChange}
                />

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effort & Contributions *
                  </label>
                  <textarea
                    name="effortAndContributionsDescription"
                    value={formData.effortAndContributionsDescription}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  />
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <label className="flex flex-col items-center justify-center cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload images for effort & contributions</span>
                      <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'effortAndContributions')}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                  </div>

                  {uploadedImages.effortAndContributions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {uploadedImages.effortAndContributions.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage('effortAndContributions', index)}
                              disabled={loading}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="text-xs text-gray-500 truncate mt-1">
                              {file.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project URL
                    </label>
                    <input
                      type="url"
                      name="projectUrl"
                      value={formData.projectUrl}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="https://yoursite.com/projects/my-project"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    {!formData.projectUrl && formData.title && (
                      <p className="text-xs text-gray-500 mt-1">
                        Auto-generated: <span className="font-medium">
                          http://localhost:3000/projects/{generateSlug(formData.title)}
                        </span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-8">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Project
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading projects...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map(project => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{project.projectType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{project.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(project)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-900 mr-4 disabled:opacity-50"
                        >
                          <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No projects yet. Click "Add New Project" to create your first project.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}