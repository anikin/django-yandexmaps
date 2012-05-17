from django.db import models
from lemon.extradmin.options import BaseModelAdmin
from .widgets import MapWidget


class MapFieldMixin(BaseModelAdmin):

    map_fields = ()

    def formfield_for_dbfield(self, db_field, **kwargs):

        formfield = super(MapFieldMixin, self).formfield_for_dbfield(db_field, **kwargs)
        
        if isinstance(db_field, models.TextField):
            if db_field.name in self.map_fields:
                formfield = self.formfield_for_maptextfield(db_field, **kwargs)

        return formfield

    def formfield_for_maptextfield(self, db_field, request=None, **kwargs):
        try:
            kwargs['widget'] = MapWidget(db_field.rel)
        except TypeError: # django 1.4+
            kwargs['widget'] = MapWidget(db_field.rel, self.admin_site)
        return db_field.formfield(**kwargs)
