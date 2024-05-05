import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, View, NavigateAction } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseISO, endOfMonth, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { SlotSearchCriteria, getAvailableSlots } from '../../api/slots/slots.api';
import moment from 'moment';
import 'moment/locale/en-gb';
import { format } from 'date-fns';
import CalendarToolbar from './CalendarToolbar';
import CalendarEvent from './CalendarEvent';
import { bookSlot } from '../../api/slots/slots.api';
import BookingDialog from './BookingDialog';
import { ToastContext } from '../../context/ToastContext';
import { fetchSpecialties } from '../../api/specialties.api';
import SpecialtyList from './SpecialtyList';
import { useNavigate } from 'react-router-dom';

moment.locale('en-gb');
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const setToast = useContext(ToastContext);
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>('month');
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const navigate = useNavigate();
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

    useEffect(() => {
        const fetchSpecialtiesData = async () => {
            const data = await fetchSpecialties();
            setSpecialties(data);
        };
        fetchSpecialtiesData();
    }, []);

    useEffect(() => {
        if (selectedSpecialty) {
            fetchSlots(currentDate);
        }
    }, [currentDate, selectedSpecialty, currentView]);

    const handleChange = (event) => {
        setSelectedSpecialty(event.target.value);
    };

    const fetchSlots = async (date: Date) => {
        const startOfViewDate = currentView === 'month' ? startOfMonth(date) : startOfWeek(date, { weekStartsOn: 1 });
        const endOfViewDate = currentView === 'month' ? endOfMonth(date) : endOfWeek(date, { weekStartsOn: 1 });

        const criteria: SlotSearchCriteria = {
            startTime: format(startOfViewDate, "yyyy-MM-dd'T'HH:mm:ss"),
            endTime: format(endOfViewDate, "yyyy-MM-dd'T'HH:mm:ss"),
            slotStatus: 'AVAILABLE',
            specialtyId: selectedSpecialty,
        };
        const slots = await getAvailableSlots(criteria);
        const events = slots.map(slot => ({
            id: slot.id,
            title: slot.doctorFullName,
            start: parseISO(slot.startTime),
            end: parseISO(slot.endTime),
            doctorSpecialties: slot.doctorSpecialties,
        }));
        setEvents(events);
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const handleNavigate = (newDate: Date, view: View, action: NavigateAction) => {
        setCurrentDate(newDate);
        setCurrentView(view);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleBook = async () => {
        try {
            await bookSlot(selectedEvent.id);
            setToast({ type: 'success', message: 'Booking successful!' });
            setOpen(false);
            navigate('/bookedslots');
        } catch (error) {
            setToast({ type: 'error', message: 'Failed to book slot!' });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ height: '500px', width: '90%', margin: 'auto' }}>
            {selectedSpecialty ? (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    onNavigate={handleNavigate}
                    view={currentView}
                    onView={handleViewChange}
                    culture='en-gb'
                    popup
                    min={new Date(0, 0, 0, 7, 0)}
                    max={new Date(0, 0, 0, 21, 0)}
                    components={{
                        toolbar: (toolbarProps) => <CalendarToolbar {...toolbarProps} specialties={specialties} />,
                        event: CalendarEvent
                    }}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={() => ({ className: 'hide-event-time' })}
                />
            ) : (
                <SpecialtyList
                    specialties={specialties}
                    handleChange={handleChange}
                />
            )}
            <BookingDialog
                open={open}
                onClose={handleClose}
                onBook={handleBook}
                selectedEvent={selectedEvent}
            />
        </div>
    );
};

export default CalendarPage;