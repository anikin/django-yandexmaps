from django.forms.widgets import Textarea
from django.utils.safestring import mark_safe
from django.forms.util import flatatt
from django.utils.html import escape, conditional_escape
from django.utils.encoding import force_unicode

from django.utils.translation import ugettext_lazy as _


class MapWidget(Textarea):

    def __init__(self, attrs=None):
        final_attrs = {'class': 'vMapField'}
        if attrs is not None:
            final_attrs.update(attrs)
        super(MapWidget, self).__init__(attrs=final_attrs)

    def render(self, name, value, attrs=None):

        if value is None: value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        map_container = '<div id="ymaps-map-container" style="width: 600px; height: 400px; padding-left:165px;"></div>'
        init_map = '<script type="text/javascript" src="http://api-maps.yandex.ru/2.0/?coordorder=longlat&load=package.full&wizard=constructor&lang=ru-RU"></script>'
        js = '<script src="/static/js/LemonMap.js" type="text/javascript"></script>'
        s = _(u'search')
        save = _(u'save')
        save_button = '<input type="button" value="%s" id="SAVE_BUTTON">' % save.translate('save')
        search_form = '<p style="margin:15px 0 15px 160px;"><input type="text" id="address" /><input type="button" value="%s" id="find_address" />%s</p>' % (s.translate(u'search'), save_button)
        search_result_container = '<div id="load_address"></div>'
        return mark_safe(u'<div style="display:none"><textarea%s>%s</textarea></div>%s %s %s %s %s' % (flatatt(final_attrs),
                conditional_escape(force_unicode(value)), map_container, js, init_map, search_form, search_result_container))
