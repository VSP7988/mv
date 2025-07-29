import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  Heart,
  Stethoscope,
  HandHeart,
  FolderOpen,
  Award,
  LogOut,
  Settings,
  BarChart3,
  Edit,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  ArrowLeft,
  Info,
  Camera,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save
} from 'lucide-react';
import { supabase, Banner, AboutContent, Cause } from '../../lib/supabase';

const HomePageManagement = () => {
  const [saving, setSaving] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'banners', 'about', 'causes', 'board', 'gallery'
  const [banners, setBanners] = useState<Banner[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  // Board & Staff state
  const [boardStaff, setBoardStaff] = useState<BoardStaff[]>([]);
  const [boardStaffLoading, setBoardStaffLoading] = useState(true);
  const [boardStaffError, setBoardStaffError] = useState<string | null>(null);
  const [isBoardStaffModalOpen, setIsBoardStaffModalOpen] = useState(false);
  const [editingBoardMember, setEditingBoardMember] = useState<BoardStaff | null>(null);
  const [boardStaffFormData, setBoardStaffFormData] = useState({
    name: '',
    designation: '',
    image_url: '',
    is_active: true,
    sort_order: 0
  });

  const [boardStaffForm, setBoardStaffForm] = useState({
    name: '',
    designation: '',
    image_url: '',
    is_active: true,
    sort_order: 0,
  });

  // Load Board & Staff
  // Save Board & Staff Member
  const saveBoardStaffMember = async () => {
    try {
      if (editingBoardStaff) {
        const { error } = await supabase
          .from('board_staff')
          .update({
            name: boardStaffForm.name,
            designation: boardStaffForm.designation,
            image_url: boardStaffForm.image_url,
            is_active: boardStaffForm.is_active,
            sort_order: boardStaffForm.sort_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBoardStaff);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('board_staff')
          .insert({
            name: boardStaffForm.name,
            designation: boardStaffForm.designation,
            image_url: boardStaffForm.image_url,
            is_active: boardStaffForm.is_active,
            sort_order: boardStaffForm.sort_order
          });

        if (error) throw error;
      }

      loadBoardStaff();
      setShowBoardStaffForm(false);
      setEditingBoardStaff(null);
      setBoardStaffForm({
        name: '',
        designation: '',
        image_url: '',
        is_active: true,
        sort_order: 0
      });
    } catch (error) {
      console.error('Error saving board staff member:', error);
    }
  };

  // Delete Board & Staff Member
  const deleteBoardStaffMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this board member?')) {
      try {
        const { error } = await supabase
          .from('board_staff')
          .delete()
          .eq('id', id);

        if (error) throw error;
        loadBoardStaff();
      } catch (error) {
        console.error('Error deleting board staff member:', error);
      }
    }
  };

  // Edit Board & Staff Member
  const editBoardStaffMember = (member: BoardStaff) => {
    setBoardStaffForm({
      name: member.name,
      designation: member.designation,
      image_url: member.image_url,
      is_active: member.is_active,
      sort_order: member.sort_order
    });
    setEditingBoardStaff(member.id);
    setShowBoardStaffForm(true);
  };

  // Handle Board Staff Form Change
  const handleBoardStaffFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setBoardStaffForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  // Handle Board Staff Image Upload
  const handleBoardStaffImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBoardStaffForm(prev => ({
          ...prev,
          image_url: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    loadBanners();
    loadAboutContent();
  }, []);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [galleryDragActive, setGalleryDragActive] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    category: 'general',
    image_url: '',
    is_active: true
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    position: 'left' as 'left' | 'center' | 'right'
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // About form state
  const [aboutFormData, setAboutFormData] = useState({
    image_url: '',
    years_of_service: 15,
    about_title: 'About MV Charities',
    about_text: '',
    lives_impacted: 500,
    active_volunteers: 50,
    our_vision: '',
    our_mission: ''
  });
  const aboutFileInputRef = useRef<HTMLInputElement>(null);
  const [aboutDragActive, setAboutDragActive] = useState(false);

  // Causes management state
  const [isCauseModalOpen, setIsCauseModalOpen] = useState(false);
  const [editingCause, setEditingCause] = useState<Cause | null>(null);
  const [causeFormData, setCauseFormData] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [causeDragActive, setCauseDragActive] = useState(false);
  const causeFileInputRef = useRef<HTMLInputElement>(null);

  // Board & Staff Management State
  const [showBoardStaffForm, setShowBoardStaffForm] = useState(false);
  const [showBoardStaffModal, setShowBoardStaffModal] = useState(false);
  

  // Gallery Management State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [useUrlInput, setUseUrlInput] = useState(false);

  const managementOptions = [
    {
      id: 'banners',
      title: 'Banner Management',
      icon: ImageIcon,
      description: 'Manage hero slider banners',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'about',
      title: 'About Management',
      icon: Info,
      description: 'Manage about section content',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'causes',
      title: 'Our Causes Management',
      icon: Heart,
      description: 'Manage causes and donation options',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'board',
      title: 'Board & Staff Management',
      icon: Users,
      description: 'Manage team members and staff',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'gallery',
      title: 'Gallery Management',
      icon: Camera,
      description: 'Manage photo gallery',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Load banners from database
  useEffect(() => {
    if (currentView === 'banners') {
      loadBanners();
    } else if (currentView === 'about') {
      loadAboutContent();
    } else if (currentView === 'causes') {
      loadCauses();
    } else if (currentView === 'board') {
      loadBoardStaff();
    } else if (currentView === 'gallery') {
      loadGalleryImages();
    }
  }, [currentView]);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error loading banners:', error);
      alert('Error loading banners. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAboutContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setAboutContent(data);
        setAboutFormData({
          image_url: data.image_url,
          years_of_service: data.years_of_service,
          about_title: data.about_title,
          about_text: data.about_text,
          lives_impacted: data.lives_impacted,
          active_volunteers: data.active_volunteers,
          our_vision: data.our_vision,
          our_mission: data.our_mission
        });
      }
    } catch (error) {
      console.error('Error loading about content:', error);
      alert('Error loading about content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadCauses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('causes')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCauses(data || []);
    } catch (error) {
      console.error('Error loading causes:', error);
      alert('Error loading causes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

  // Gallery Management Functions
  const handleAddGalleryImages = () => {
    setEditingGalleryImage(null);
    setGalleryForm({
      title: '',
      description: '',
      image_url: '',
      category: 'general',
      is_active: true,
      sort_order: 0
    });
    setSelectedFiles([]);
    setShowGalleryForm(true);
  };

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error loading gallery images:', error);
      alert('Error loading gallery images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAboutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setAboutFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleCauseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCauseFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBoardStaffInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBoardStaffFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      // Convert file to base64 for immediate preview and storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          image_url: result
        }));
      };
      reader.readAsDataURL(file);
      
      console.log(`File "${file.name}" converted to base64 for storage`);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleAboutDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setAboutDragActive(true);
    } else if (e.type === "dragleave") {
      setAboutDragActive(false);
    }
  };

  const handleAboutDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAboutDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAboutFile(e.dataTransfer.files[0]);
    }
  };

  const handleAboutFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleAboutFile(e.target.files[0]);
    }
  };

  const handleAboutFile = (file: File) => {
    if (file.type.startsWith('image/')) {
     // Check file size (5MB limit)
     if (file.size > 5 * 1024 * 1024) {
       alert('File size must be less than 5MB');
       return;
     }
     
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAboutFormData(prev => ({
          ...prev,
          image_url: result
        }));
       console.log('About image uploaded successfully:', file.name);
      };
     reader.onerror = () => {
       alert('Error reading file. Please try again.');
     };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  // Cause drag and drop handlers
  const handleCauseDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setCauseDragActive(true);
    } else if (e.type === "dragleave") {
      setCauseDragActive(false);
    }
  };

  const handleCauseDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCauseDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCauseFile(e.dataTransfer.files[0]);
    }
  };

  const handleCauseFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleCauseFile(e.target.files[0]);
    }
  };

  const handleCauseFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCauseFormData(prev => ({
          ...prev,
          image_url: result
        }));
        console.log('Cause image uploaded successfully:', file.name);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  // Board & Staff drag and drop handlers
  const handleBoardStaffDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBoardStaffDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBoardStaffFile(e.dataTransfer.files[0]);
    }
  };

 
  const handleBoardStaffFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBoardStaffFormData(prev => ({
          ...prev,
          image_url: result
        }));
        console.log('Board staff image uploaded successfully:', file.name);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  // Gallery handlers
  const handleAddGalleryImage = () => {
    setEditingGalleryImage(null);
    setGalleryForm({
      title: '',
      description: '',
      category: 'general',
      image_url: '',
      is_active: true
    });
    setSelectedGalleryFiles([]);
    setShowGalleryForm(true);
  };

  const handleEditGalleryImage = (image: GalleryImage) => {
    setEditingGalleryImage(image);
    setGalleryForm({
      title: image.title,
      description: image.description || '',
      category: image.category,
      image_url: image.image_url,
      is_active: image.is_active
    });
    setSelectedGalleryFiles([]);
    setShowGalleryForm(true);
  };

  const handleGalleryDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setGalleryDragActive(true);
    } else if (e.type === "dragleave") {
      setGalleryDragActive(false);
    }
  };

  const handleGalleryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGalleryDragActive(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      setSelectedGalleryFiles(files);
    }
  };

  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      setSelectedGalleryFiles(files);
    }
  };

  const handleSaveGalleryImages = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingGalleryImage && selectedGalleryFiles.length === 0 && !galleryForm.image_url) {
      alert('Please select images or enter an image URL');
      return;
    }

    try {
      setSaving(true);

      if (editingGalleryImage) {
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: galleryForm.title,
            description: galleryForm.description,
            category: galleryForm.category,
            image_url: galleryForm.image_url,
            is_active: galleryForm.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingGalleryImage.id);

        if (error) throw error;
        alert('Gallery image updated successfully!');
      } else {
        // Add new images
        const imagesToInsert = [];
        
        if (selectedGalleryFiles.length > 0) {
          // Process selected files
          for (const file of selectedGalleryFiles) {
            const reader = new FileReader();
            const imageData = await new Promise<string>((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(file);
            });
            
            imagesToInsert.push({
              title: galleryForm.title || file.name,
              description: galleryForm.description,
              category: galleryForm.category,
              image_url: imageData,
              is_active: galleryForm.is_active,
              sort_order: galleryImages.length + imagesToInsert.length + 1
            });
          }
        } else if (galleryForm.image_url) {
          // Single URL image
          imagesToInsert.push({
            title: galleryForm.title,
            description: galleryForm.description,
            category: galleryForm.category,
            image_url: galleryForm.image_url,
            is_active: galleryForm.is_active,
            sort_order: galleryImages.length + 1
          });
        }

        if (imagesToInsert.length > 0) {
          const { error } = await supabase
            .from('gallery_images')
            .insert(imagesToInsert);

          if (error) throw error;
          alert(`${imagesToInsert.length} image(s) added successfully!`);
        }
      }

      await loadGalleryImages();
      setShowGalleryForm(false);
    } catch (error) {
      console.error('Error saving gallery images:', error);
      alert('Error saving gallery images. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleGalleryImageStatus = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ 
          is_active: !image.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', image.id);

      if (error) throw error;
      await loadGalleryImages();
    } catch (error) {
      console.error('Error updating gallery image status:', error);
      alert('Error updating gallery image status. Please try again.');
    }
  };

  const handleDeleteGalleryImage = async (image: GalleryImage) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const { error } = await supabase
          .from('gallery_images')
          .delete()
          .eq('id', image.id);

        if (error) throw error;
        await loadGalleryImages();
        alert('Gallery image deleted successfully!');
      } catch (error) {
        console.error('Error deleting gallery image:', error);
        alert('Error deleting gallery image. Please try again.');
      }
    }
  };

  const openModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        image_url: banner.image_url,
        position: banner.position
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        image_url: '',
        position: 'left'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      position: 'left'
    });
  };

  const openCauseModal = (cause?: Cause) => {
    if (cause) {
      setEditingCause(cause);
      setCauseFormData({
        title: cause.title,
        description: cause.description,
        image_url: cause.image_url
      });
    } else {
      setEditingCause(null);
      setCauseFormData({
        title: '',
        description: '',
        image_url: ''
      });
    }
    setIsCauseModalOpen(true);
  };

  const closeCauseModal = () => {
    setIsCauseModalOpen(false);
    setEditingCause(null);
    setCauseFormData({
      title: '',
      description: '',
      image_url: ''
    });
  };

  const handleAddBoardStaff = () => {
    setEditingBoardStaff(null);
    setBoardStaffFormData({
      name: '',
      designation: '',
      image_url: '',
      is_active: true,
      sort_order: 0
    });
    setShowBoardStaffModal(true);
  };

  const handleEditBoardStaff = (member: BoardStaff) => {
    setEditingBoardStaff(member);
    setBoardStaffFormData({
      name: member.name,
      designation: member.designation,
      image_url: member.image_url,
      is_active: member.is_active,
      sort_order: member.sort_order
    });
    setShowBoardStaffModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      alert('Please upload an image');
      return;
    }

    try {
      setSaving(true);
      
      if (editingBanner) {
        // Update existing banner
        const { error } = await supabase
          .from('banners')
          .update({
            title: formData.title || null,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url,
            position: formData.position,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBanner.id);

        if (error) throw error;
        console.log('Banner updated successfully');
      } else {
        // Create new banner
        const maxSortOrder = banners.length > 0 ? Math.max(...banners.map(b => b.sort_order)) : 0;
        
        const { error } = await supabase
          .from('banners')
          .insert({
            title: formData.title || null,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url,
            position: formData.position,
            sort_order: maxSortOrder + 1
          });

        if (error) throw error;
        console.log('Banner created successfully');
      }

      // Reload banners from database
      await loadBanners();
      closeModal();
      alert(editingBanner ? 'Banner updated successfully!' : 'Banner added successfully!');
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error saving banner. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aboutFormData.image_url || !aboutFormData.about_text || !aboutFormData.our_vision || !aboutFormData.our_mission) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      
      if (aboutContent) {
        // Update existing content
        const { error } = await supabase
          .from('about_content')
          .update({
            ...aboutFormData,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutContent.id);

        if (error) throw error;
        console.log('About content updated successfully');
      } else {
        // Create new content
        const { error } = await supabase
          .from('about_content')
          .insert(aboutFormData);

        if (error) throw error;
        console.log('About content created successfully');
      }

      await loadAboutContent();
      alert('About content saved successfully!');
    } catch (error) {
      console.error('Error saving about content:', error);
      alert('Error saving about content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCauseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!causeFormData.title || !causeFormData.description || !causeFormData.image_url) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    try {
      setSaving(true);
      
      if (editingCause) {
        // Update existing cause
        const { error } = await supabase
          .from('causes')
          .update({
            title: causeFormData.title,
            description: causeFormData.description,
            image_url: causeFormData.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCause.id);

        if (error) throw error;
        console.log('Cause updated successfully');
      } else {
        // Create new cause
        const maxSortOrder = causes.length > 0 ? Math.max(...causes.map(c => c.sort_order)) : 0;
        
        const { error } = await supabase
          .from('causes')
          .insert({
            title: causeFormData.title,
            description: causeFormData.description,
            image_url: causeFormData.image_url,
            sort_order: maxSortOrder + 1
          });

        if (error) throw error;
        console.log('Cause created successfully');
      }

      // Reload causes from database
      await loadCauses();
      closeCauseModal();
      alert(editingCause ? 'Cause updated successfully!' : 'Cause added successfully!');
    } catch (error) {
      console.error('Error saving cause:', error);
      alert('Error saving cause. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBoardStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!boardStaffFormData.name || !boardStaffFormData.designation) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      
      if (editingBoardStaff) {
        // Update existing member
        const { error } = await supabase
          .from('board_staff')
          .update({
            name: boardStaffFormData.name,
            designation: boardStaffFormData.designation,
            image_url: boardStaffFormData.image_url,
            is_active: boardStaffFormData.is_active,
            sort_order: boardStaffFormData.sort_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBoardStaff.id);

        if (error) throw error;
        console.log('Board staff updated successfully');
      } else {
        // Create new member
        const maxSortOrder = boardStaff.length > 0 ? Math.max(...boardStaff.map(b => b.sort_order)) : 0;
        
        const { error } = await supabase
          .from('board_staff')
          .insert({
            name: boardStaffFormData.name,
            designation: boardStaffFormData.designation,
            image_url: boardStaffFormData.image_url,
            is_active: boardStaffFormData.is_active,
            sort_order: maxSortOrder + 1
          });

        if (error) throw error;
        console.log('Board staff created successfully');
      }

      // Reload board staff from database
      await loadBoardStaff();
      setShowBoardStaffModal(false);
      alert(editingBoardStaff ? 'Member updated successfully!' : 'Member added successfully!');
    } catch (error) {
      console.error('Error saving board staff:', error);
      alert('Error saving board staff. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const { error } = await supabase
          .from('banners')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Reload banners from database
        await loadBanners();
        alert('Banner deleted successfully!');
      } catch (error) {
        console.error('Error deleting banner:', error);
        alert('Error deleting banner. Please try again.');
      }
    }
  };

  const deleteCause = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this cause?')) {
      try {
        const { error } = await supabase
          .from('causes')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Reload causes from database
        await loadCauses();
        alert('Cause deleted successfully!');
      } catch (error) {
        console.error('Error deleting cause:', error);
        alert('Error deleting cause. Please try again.');
      }
    }
  };

  const handleDeleteBoardStaff = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const { error } = await supabase
          .from('board_staff')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Reload board staff from database
        await loadBoardStaff();
        alert('Member deleted successfully!');
      } catch (error) {
        console.error('Error deleting board staff:', error);
        alert('Error deleting board staff. Please try again.');
      }
    }
  };

  const toggleBannerStatus = async (id: string) => {
    const banner = banners.find(b => b.id === id);
    if (!banner) return;

    try {
      const { error } = await supabase
        .from('banners')
        .update({ 
          is_active: !banner.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      // Reload banners from database
      await loadBanners();
    } catch (error) {
      console.error('Error updating banner status:', error);
      alert('Error updating banner status. Please try again.');
    }
  };

  const toggleCauseStatus = async (id: string) => {
    const cause = causes.find(c => c.id === id);
    if (!cause) return;

    try {
      const { error } = await supabase
        .from('causes')
        .update({ 
          is_active: !cause.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      // Reload causes from database
      await loadCauses();
    } catch (error) {
      console.error('Error updating cause status:', error);
      alert('Error updating cause status. Please try again.');
    }
  };

  const handleToggleBoardStaffStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('board_staff')
        .update({ 
          is_active: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      // Reload board staff from database
      await loadBoardStaff();
    } catch (error) {
      console.error('Error updating board staff status:', error);
      alert('Error updating board staff status. Please try again.');
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'left': return AlignLeft;
      case 'center': return AlignCenter;
      case 'right': return AlignRight;
      default: return AlignLeft;
    }
  };

  const handleOptionClick = (optionId: string) => {
    setCurrentView(optionId);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const closeBoardStaffModal = () => {
    setIsBoardStaffModalOpen(false);
    setEditingBoardMember(null);
    setBoardStaffFormData({
      name: '',
      designation: '',
      image_url: '',
      is_active: true,
      sort_order: 0
    });
  };

  // Render main options view
  if (currentView === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Home Page Management</h1>
                  <p className="text-sm text-gray-600">Manage homepage content and sections</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Home Page Sections</h2>
            <p className="text-gray-600">Choose a section to manage its content</p>
          </div>

          {boardStaffError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{boardStaffError}</p>
              <button 
                onClick={loadBoardStaff}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          )}

          {/* Management Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group p-6"
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${option.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render about management view
  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">About Management</h1>
                  <p className="text-sm text-gray-600">Manage homepage about section content</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* About Management Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">About Section Content</h2>
              <p className="text-gray-600">Manage the content displayed in the homepage about section</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading content...</span>
              </div>
            ) : (
              <form onSubmit={handleAboutSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About Section Image *
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                      aboutDragActive 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                    onDragEnter={handleAboutDrag}
                    onDragLeave={handleAboutDrag}
                    onDragOver={handleAboutDrag}
                    onDrop={handleAboutDrop}
                  >
                    <input
                      ref={aboutFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAboutFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {aboutFormData.image_url ? (
                      <div className="space-y-3">
                        <img
                          src={aboutFormData.image_url}
                          alt="About section preview"
                          className="mx-auto h-32 w-auto rounded-lg shadow-md"
                        />
                        <p className="text-sm text-green-600 font-medium">Image uploaded successfully</p>
                        <button
                          type="button"
                          onClick={() => {
                            setAboutFormData(prev => ({ ...prev, image_url: '' }));
                            if (aboutFileInputRef.current) {
                              aboutFileInputRef.current.value = '';
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            Drag and drop an image here, or click to select
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports JPG, PNG, GIF files
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => aboutFileInputRef.current?.click()}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center mx-auto"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter image URL directly:
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={aboutFormData.image_url.startsWith('data:') ? '' : aboutFormData.image_url}
                      onChange={(e) => setAboutFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Service
                    </label>
                    <input
                      type="number"
                      name="years_of_service"
                      value={aboutFormData.years_of_service}
                      onChange={handleAboutInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lives Impacted
                    </label>
                    <input
                      type="number"
                      name="lives_impacted"
                      value={aboutFormData.lives_impacted}
                      onChange={handleAboutInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Active Volunteers
                    </label>
                    <input
                      type="number"
                      name="active_volunteers"
                      value={aboutFormData.active_volunteers}
                      onChange={handleAboutInputChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="50"
                    />
                  </div>
                </div>

                {/* About Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About Title
                  </label>
                  <input
                    type="text"
                    name="about_title"
                    value={aboutFormData.about_title}
                    onChange={handleAboutInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="About MV Charities"
                  />
                </div>

                {/* About Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About Text *
                  </label>
                  <textarea
                    name="about_text"
                    value={aboutFormData.about_text}
                    onChange={handleAboutInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                    placeholder="Enter the main about section text..."
                  />
                </div>

                {/* Vision and Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Our Vision *
                    </label>
                    <textarea
                      name="our_vision"
                      value={aboutFormData.our_vision}
                      onChange={handleAboutInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Enter vision statement..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Our Mission *
                    </label>
                    <textarea
                      name="our_mission"
                      value={aboutFormData.our_mission}
                      onChange={handleAboutInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Enter mission statement..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save About Content
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render causes management view
  if (currentView === 'causes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Our Causes Management</h1>
                  <p className="text-sm text-gray-600">Manage causes displayed on the homepage</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Causes Management Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Our Causes</h2>
                <p className="text-gray-600">Manage causes and donation opportunities displayed on the homepage</p>
              </div>
              <button
                onClick={() => openCauseModal()}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Cause
              </button>
            </div>

            {/* Causes Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading causes...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {causes.map((cause) => (
                  <div key={cause.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={cause.image_url}
                        alt={cause.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => toggleCauseStatus(cause.id)}
                          className={`p-1 rounded-full ${cause.is_active ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                        >
                          {cause.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 truncate">{cause.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cause.description}</p>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openCauseModal(cause)}
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCause(cause.id)}
                          className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cause Modal */}
        {isCauseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingCause ? 'Edit Cause' : 'Add New Cause'}
                  </h3>
                  <button
                    onClick={closeCauseModal}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleCauseSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={causeFormData.title}
                      onChange={handleCauseInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter cause title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={causeFormData.description}
                      onChange={handleCauseInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Enter cause description"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cause Image *
                    </label>
                    
                    {/* Drag and Drop Area */}
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                        causeDragActive 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-primary-400'
                      }`}
                      onDragEnter={handleCauseDrag}
                      onDragLeave={handleCauseDrag}
                      onDragOver={handleCauseDrag}
                      onDrop={handleCauseDrop}
                    >
                      <input
                        ref={causeFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCauseFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {causeFormData.image_url ? (
                        <div className="space-y-3">
                          <img
                            src={causeFormData.image_url}
                            alt="Preview"
                            className="mx-auto h-32 w-auto rounded-lg shadow-md"
                          />
                          <p className="text-sm text-green-600 font-medium">Image uploaded successfully</p>
                          <button
                            type="button"
                            onClick={() => {
                              setCauseFormData(prev => ({ ...prev, image_url: '' }));
                              if (causeFileInputRef.current) {
                                causeFileInputRef.current.value = '';
                              }
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove image
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div>
                            <p className="text-lg font-medium text-gray-700">
                              Drag and drop an image here, or click to select
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports JPG, PNG, GIF files (Max 5MB)
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => causeFileInputRef.current?.click()}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center mx-auto"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Image File
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Alternative: Direct URL Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or enter image URL directly:
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={causeFormData.image_url.startsWith('data:') ? '' : causeFormData.image_url}
                        onChange={(e) => setCauseFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={closeCauseModal}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingCause ? 'Update Cause' : 'Add Cause'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render board & staff management view
  if (currentView === 'board') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Board & Staff Management</h1>
                  <p className="text-sm text-gray-600">Manage team members and staff</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Board & Staff Management Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Board & Staff Management</h2>
                <p className="text-gray-600">Manage team members and staff displayed on the homepage</p>
              </div>
              <button
                onClick={handleAddBoardStaff}
                disabled={boardStaffLoading}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Member
              </button>
            </div>

            {/* Board & Staff Grid */}
            {boardStaffLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading board & staff...</span>
              </div>
            ) : boardStaffError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{boardStaffError}</p>
                <button
                  onClick={loadBoardStaff}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boardStaff.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => handleToggleBoardStaffStatus(member.id, member.is_active)}
                          className={`p-1 rounded-full ${member.is_active ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                        >
                          {member.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 truncate">{member.name}</h3>
                        <p className="text-primary-600 font-medium text-sm">{member.designation}</p>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleEditBoardStaff(member)}
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBoardStaff(member.id)}
                          className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render gallery management view
  if (currentView === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Gallery Management</h1>
                  <p className="text-sm text-gray-600">Manage photo gallery</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Gallery Management */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery Management</h2>
                <p className="text-gray-600">Manage gallery images for your website</p>
              </div>
              <button
                onClick={handleAddGalleryImage}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Images
              </button>
            </div>

            {/* Gallery Images Grid */}
            <>
              {boardStaff.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Board Members Found</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first board member.</p>
                  <button
                    onClick={() => {
                      setBoardStaffForm({
                        name: '',
                        designation: '',
                        image_url: '',
                        is_active: true,
                        sort_order: 0
                      });
                      setEditingBoardStaff(null);
                      setShowBoardStaffForm(true);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Add First Member
                  </button>
                </div>
              ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        image.is_active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {image.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">{image.category}</p>
                    {image.description && (
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{image.description}</p>
                    )}
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditGalleryImage(image)}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleGalleryImageStatus(image)}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                          image.is_active
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {image.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryImage(image)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              )}
            </>

            {galleryImages.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Images</h3>
                <p className="text-gray-600 mb-6">Start by adding some images to your gallery</p>
                <button
                  onClick={handleAddGalleryImage}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Add Your First Images
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render banner management view
  if (currentView === 'banners') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Header */}
        <header className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Banner Management</h1>
                  <p className="text-sm text-gray-600">Manage homepage hero slider banners</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Banner Management Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hero Slider Banners</h2>
                <p className="text-gray-600">Manage banners displayed on the homepage hero section</p>
              </div>
              <button
                onClick={() => openModal()}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Banner
              </button>
            </div>

            {/* Banners Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Loading banners...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => {
                  const PositionIcon = getPositionIcon(banner.position);
                  return (
                    <div key={banner.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={banner.image_url}
                          alt={banner.title || 'Banner'}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button
                            onClick={() => toggleBannerStatus(banner.id)}
                            className={`p-1 rounded-full ${banner.is_active ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                          >
                            {banner.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <div className="flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                            <PositionIcon className="h-3 w-3 mr-1" />
                            {banner.position}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 truncate">{banner.title || 'Untitled Banner'}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{banner.subtitle || 'No subtitle'}</p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(banner)}
                            className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBanner(banner.id)}
                            className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title (Optional)
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter banner title"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subtitle (Optional)
                    </label>
                    <textarea
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Enter banner subtitle"
                    />
                  </div>

                  {/* Image Position */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Text Position
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'left', label: 'Left', icon: AlignLeft },
                        { value: 'center', label: 'Center', icon: AlignCenter },
                        { value: 'right', label: 'Right', icon: AlignRight }
                      ].map((position) => {
                        const Icon = position.icon;
                        return (
                          <button
                            key={position.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, position: position.value as any }))}
                            className={`p-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                              formData.position === position.value
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-300 text-gray-700 hover:border-primary-300'
                            }`}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {position.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Banner Image *
                    </label>
                    
                    {/* Drag and Drop Area */}
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                        dragActive 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-primary-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {formData.image_url ? (
                        <div className="space-y-3">
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="mx-auto h-32 w-auto rounded-lg shadow-md"
                          />
                          <p className="text-sm text-green-600 font-medium">Image uploaded successfully</p>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, image_url: '' }));
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove image
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div>
                            <p className="text-lg font-medium text-gray-700">
                              Drag and drop an image here, or click to select
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports JPG, PNG, GIF files
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center mx-auto"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Alternative: Direct URL Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or enter image URL directly:
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingBanner ? 'Update Banner' : 'Add Banner'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Board & Staff Modal */}
        {showBoardStaffModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingBoardStaff ? 'Edit Board Member' : 'Add Board Member'}
                </h3>
                <button
                  onClick={() => setShowBoardStaffModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleBoardStaffSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image *
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200"
                    onDragOver={handleBoardStaffDragOver}
                    onDrop={handleBoardStaffDrop}
                  >
                    {boardStaffFormData.image_url ? (
                      <div className="space-y-4">
                        <img
                          src={boardStaffFormData.image_url}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-full"
                        />
                        <button
                          type="button"
                          onClick={() => setBoardStaffFormData(prev => ({ ...prev, image_url: '' }))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            Drag and drop an image here, or click to select
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports JPG, PNG, GIF files (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBoardStaffImageUpload}
                          className="hidden"
                          id="board-staff-image-upload"
                        />
                        <label
                          htmlFor="board-staff-image-upload"
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 cursor-pointer inline-flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={boardStaffFormData.name}
                    onChange={handleBoardStaffInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={boardStaffFormData.designation}
                    onChange={handleBoardStaffInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter designation"
                  />
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    value={boardStaffFormData.sort_order}
                    onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={boardStaffFormData.is_active}
                    onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active (visible on website)
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBoardStaffModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {editingBoardStaff ? 'Update Member' : 'Add Member'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Form Modal */}
        {showGalleryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingGalleryImage ? 'Edit Gallery Image' : 'Add Gallery Images'}
                  </h3>
                  <button
                    onClick={() => setShowGalleryForm(false)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSaveGalleryImages} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter image title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                      placeholder="Enter image description"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="general">General</option>
                      <option value="events">Events</option>
                      <option value="activities">Activities</option>
                      <option value="achievements">Achievements</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  {!editingGalleryImage && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Images *
                      </label>
                      
                      {/* Drag and Drop Area */}
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                          galleryDragActive 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-300 hover:border-primary-400'
                        }`}
                        onDragEnter={handleGalleryDrag}
                        onDragLeave={handleGalleryDrag}
                        onDragOver={handleGalleryDrag}
                        onDrop={handleGalleryDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        {selectedGalleryFiles.length > 0 ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                              {selectedGalleryFiles.slice(0, 6).map((file, index) => (
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index + 1}`}
                                  className="h-20 w-full object-cover rounded"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-green-600 font-medium">
                              {selectedGalleryFiles.length} image(s) selected
                            </p>
                            <button
                              type="button"
                              onClick={() => setSelectedGalleryFiles([])}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Clear selection
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div>
                              <p className="text-lg font-medium text-gray-700">
                                Drag and drop images here, or click to select
                              </p>
                              <p className="text-sm text-gray-500">
                                Supports JPG, PNG, GIF files (Multiple selection allowed)
                              </p>
                            </div>
                            <button
                              type="button"
                              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center mx-auto"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Choose Images
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Alternative: Direct URL Input */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Or enter image URL directly:
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={galleryForm.image_url}
                          onChange={(e) => setGalleryForm(prev => ({ ...prev, image_url: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gallery_is_active"
                      checked={galleryForm.is_active}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="gallery_is_active" className="ml-2 block text-sm text-gray-700">
                      Active (visible on website)
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowGalleryForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingGalleryImage ? 'Update Image' : 'Add Images'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToMain}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {managementOptions.find(opt => opt.id === currentView)?.title || 'Management'}
                </h1>
                <p className="text-sm text-gray-600">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            {(() => {
              const option = managementOptions.find(opt => opt.id === currentView);
              if (option) {
                const Icon = option.icon;
                return (
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${option.color} rounded-full mb-4`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                );
              }
              return null;
            })()}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {managementOptions.find(opt => opt.id === currentView)?.title}
            </h2>
            <p className="text-gray-600">
              This management section is coming soon. We're working on building comprehensive tools for managing this content.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Planned Features:</h3>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li>• Content editing and management</li>
              <li>• Image and media uploads</li>
              <li>• Real-time preview</li>
              <li>• Version control</li>
              <li>• SEO optimization tools</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Board Staff Modal */}
      {isBoardStaffModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleBoardStaffSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {editingBoardMember ? 'Edit Board Member' : 'Add New Board Member'}
                    </h3>
                    <button
                      type="button"
                      onClick={closeBoardStaffModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={boardStaffFormData.name}
                        onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation *
                      </label>
                      <input
                        type="text"
                        value={boardStaffFormData.designation}
                        onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, designation: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter designation"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={boardStaffFormData.image_url}
                        onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort Order
                      </label>
                      <input
                        type="number"
                        value={boardStaffFormData.sort_order}
                        onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="board_is_active"
                        checked={boardStaffFormData.is_active}
                        onChange={(e) => setBoardStaffFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="board_is_active" className="ml-2 block text-sm text-gray-700">
                        Active (visible on website)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingBoardMember ? 'Update Member' : 'Add Member'}
                  </button>
                  <button
                    type="button"
                    onClick={closeBoardStaffModal}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageManagement;